from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import qrcode
import os
from datetime import datetime
from io import BytesIO

def generate_confirmation_pdf(applicant):
    """
    Generate PDF confirmation for interview booking with QR code
    
    Args:
        applicant: Applicant model instance
    
    Returns:
        str: Path to generated PDF file
    """
    try:
        # Create uploads/pdfs directory if it doesn't exist
        pdf_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads', 'pdfs')
        os.makedirs(pdf_dir, exist_ok=True)
        
        # Generate filename
        filename = f"booking_{applicant.booking_id}.pdf"
        filepath = os.path.join(pdf_dir, filename)
        
        # Create PDF document
        doc = SimpleDocTemplate(filepath, pagesize=A4)
        story = []
        styles = getSampleStyleSheet()
        
        # Custom styles
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#1976d2'),
            spaceAfter=30,
            alignment=TA_CENTER
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=16,
            textColor=colors.HexColor('#424242'),
            spaceAfter=12
        )
        
        # Add title
        title = Paragraph("Interview Booking Confirmation", title_style)
        story.append(title)
        story.append(Spacer(1, 0.3*inch))
        
        # Generate QR code
        qr_data = f"BOOKING:{applicant.booking_id}|SCHOOL:{applicant.school.name}|STUDENT:{applicant.student_name}"
        qr = qrcode.QRCode(version=1, box_size=10, border=2)
        qr.add_data(qr_data)
        qr.make(fit=True)
        qr_img = qr.make_image(fill_color="black", back_color="white")
        
        # Save QR code to BytesIO
        qr_buffer = BytesIO()
        qr_img.save(qr_buffer, format='PNG')
        qr_buffer.seek(0)
        
        # Save QR code temporarily
        qr_path = os.path.join(pdf_dir, f"qr_{applicant.booking_id}.png")
        qr_img.save(qr_path)
        
        # Add QR code image
        qr_image = Image(qr_path, width=2*inch, height=2*inch)
        story.append(qr_image)
        story.append(Spacer(1, 0.3*inch))
        
        # Booking ID
        booking_heading = Paragraph("Booking ID", heading_style)
        story.append(booking_heading)
        booking_id_text = Paragraph(
            f"<b>{applicant.booking_id}</b>",
            styles['Normal']
        )
        story.append(booking_id_text)
        story.append(Spacer(1, 0.2*inch))
        
        # Student Details Table
        details_heading = Paragraph("Student Details", heading_style)
        story.append(details_heading)
        
        student_data = [
            ["Student Name:", applicant.student_name],
            ["Date of Birth:", applicant.dob.strftime('%Y-%m-%d') if applicant.dob else 'N/A'],
            ["Prior School:", applicant.prior_school or 'N/A'],
            ["Parent Email:", applicant.parent_email or 'N/A'],
            ["Parent Phone:", applicant.parent_phone or 'N/A']
        ]
        
        student_table = Table(student_data, colWidths=[2*inch, 4*inch])
        student_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f5f5f5')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 11),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey)
        ]))
        story.append(student_table)
        story.append(Spacer(1, 0.3*inch))
        
        # School and Interview Details
        school_heading = Paragraph("Interview Details", heading_style)
        story.append(school_heading)
        
        school_data = [
            ["School Name:", applicant.school.name],
            ["Location:", applicant.school.location],
            ["Interview Date:", applicant.slot.date.strftime('%Y-%m-%d')],
            ["Interview Fee:", f"TZS {float(applicant.amount_paid):,.2f}"],
            ["Payment Status:", applicant.payment_status.upper()],
            ["Transaction ID:", applicant.transaction_id or 'N/A']
        ]
        
        school_table = Table(school_data, colWidths=[2*inch, 4*inch])
        school_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f5f5f5')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 11),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey)
        ]))
        story.append(school_table)
        story.append(Spacer(1, 0.4*inch))
        
        # Instructions
        instructions_heading = Paragraph("Important Instructions", heading_style)
        story.append(instructions_heading)
        
        instructions_text = """
        <bullet>•</bullet> Please arrive 15 minutes before your scheduled interview time.<br/>
        <bullet>•</bullet> Bring this confirmation document (printed or on your mobile device).<br/>
        <bullet>•</bullet> Bring a valid ID and any required documents.<br/>
        <bullet>•</bullet> Contact the school if you need to reschedule.<br/>
        """
        instructions = Paragraph(instructions_text, styles['Normal'])
        story.append(instructions)
        story.append(Spacer(1, 0.3*inch))
        
        # Footer
        support_email = os.getenv('SUPPORT_EMAIL', 'support@schoolinterviews.tz')
        support_phone = os.getenv('SUPPORT_PHONE', '+255 XXX XXX XXX')
        footer_text = f"""
        <para alignment="center">
        <b>Platform Contact:</b> {support_email} | {support_phone}<br/>
        Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}<br/>
        © {datetime.now().year} School Interview Payment Platform. All rights reserved.
        </para>
        """
        footer = Paragraph(footer_text, styles['Normal'])
        story.append(footer)
        
        # Build PDF
        doc.build(story)
        
        # Clean up temporary QR code file
        if os.path.exists(qr_path):
            os.remove(qr_path)
        
        # Return relative path
        return f"/uploads/pdfs/{filename}"
        
    except Exception as e:
        print(f"Error generating PDF: {str(e)}")
        return None

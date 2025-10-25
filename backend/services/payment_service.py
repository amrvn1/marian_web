import requests
import hashlib
import json
from datetime import datetime

class SelcomPaymentService:
    """Selcom mobile money payment integration"""
    
    def __init__(self, api_key, api_secret):
        self.api_key = api_key
        self.api_secret = api_secret
        self.base_url = "https://apigw.selcommobile.com/v1"
    
    def create_payment(self, amount, phone_number, reference, description):
        """
        Create a payment request
        
        Args:
            amount: Payment amount in TZS
            phone_number: Customer phone number
            reference: Unique reference (booking_id)
            description: Payment description
        
        Returns:
            dict: Payment response
        """
        try:
            # Format phone number (remove +255 prefix if present)
            if phone_number.startswith('+255'):
                phone_number = phone_number[4:]
            elif phone_number.startswith('255'):
                phone_number = phone_number[3:]
            
            # Prepare payment data
            payment_data = {
                "vendor": self.api_key,
                "order_id": reference,
                "buyer_email": "customer@example.com",  # Optional
                "buyer_name": "Customer",  # Optional
                "buyer_phone": phone_number,
                "amount": int(amount),
                "currency": "TZS",
                "payment_methods": ["MASTERCARD", "VISA", "TIGOPESA", "MPESA", "AIRTEL", "HALOPESA"],
                "redirect_url": f"https://your-domain.com/payment/callback",
                "cancel_url": f"https://your-domain.com/payment/cancel",
                "webhook_url": f"https://your-domain.com/api/payments/webhook/selcom"
            }
            
            # Generate signature (implement actual Selcom signature logic)
            signature = self._generate_signature(payment_data)
            
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.api_key}",
                "Signature": signature
            }
            
            # Make API request
            response = requests.post(
                f"{self.base_url}/checkout/create-order",
                json=payment_data,
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                return {
                    "success": True,
                    "payment_url": result.get("payment_url"),
                    "order_id": result.get("order_id"),
                    "message": "Payment initiated successfully"
                }
            else:
                return {
                    "success": False,
                    "message": "Payment initiation failed",
                    "error": response.text
                }
                
        except Exception as e:
            return {
                "success": False,
                "message": str(e)
            }
    
    def _generate_signature(self, data):
        """Generate Selcom API signature"""
        # Implement actual Selcom signature generation
        # This is a placeholder
        sign_string = json.dumps(data, sort_keys=True) + self.api_secret
        return hashlib.sha256(sign_string.encode()).hexdigest()


class AzampesaPaymentService:
    """Azampesa mobile money payment integration"""
    
    def __init__(self, api_key, api_secret):
        self.api_key = api_key
        self.api_secret = api_secret
        self.base_url = "https://api.azampesa.com/v1"
    
    def create_payment(self, amount, phone_number, reference, description):
        """
        Create a payment request
        
        Args:
            amount: Payment amount in TZS
            phone_number: Customer phone number
            reference: Unique reference (booking_id)
            description: Payment description
        
        Returns:
            dict: Payment response
        """
        try:
            # Format phone number
            if not phone_number.startswith('+'):
                phone_number = f"+255{phone_number}"
            
            # Prepare payment data
            payment_data = {
                "api_key": self.api_key,
                "amount": int(amount),
                "phone_number": phone_number,
                "reference": reference,
                "description": description,
                "callback_url": f"https://your-domain.com/api/payments/webhook/azampesa"
            }
            
            # Generate auth token
            auth_token = self._generate_auth_token()
            
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {auth_token}"
            }
            
            # Make API request
            response = requests.post(
                f"{self.base_url}/payments/initiate",
                json=payment_data,
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                return {
                    "success": True,
                    "transaction_id": result.get("transaction_id"),
                    "message": "Payment initiated. Please approve on your phone.",
                    "status": result.get("status")
                }
            else:
                return {
                    "success": False,
                    "message": "Payment initiation failed",
                    "error": response.text
                }
                
        except Exception as e:
            return {
                "success": False,
                "message": str(e)
            }
    
    def _generate_auth_token(self):
        """Generate Azampesa authentication token"""
        # Implement actual Azampesa auth logic
        # This is a placeholder
        combined = f"{self.api_key}:{self.api_secret}"
        return hashlib.sha256(combined.encode()).hexdigest()

import threading
from zapv2 import ZAPv2
from datetime import datetime
import time

class ZAPVulnerabilityScanner:
    def __init__(self, api_key, proxy_port=8080):
        self.zap = ZAPv2(apikey=api_key, proxies={
            'http': f'http://127.0.0.1:{proxy_port}',
            'https': f'http://127.0.0.1:{proxy_port}'
        })
        
    def configure_scanner(self, context_name, target_url, 
                         username=None, password=None,
                         login_url=None, username_field=None, 
                         password_field=None):
        """Configure scanner with authentication and advanced settings"""
        try:
            # Create new context
            self.zap.context.new_context(context_name)
            self.zap.context.include_in_context(context_name, f".*{target_url}.*")
            
            # Configure authentication if credentials provided
            if all([username, password, login_url, username_field, password_field]):
                login_request = f'username={username_field}&password={password_field}'
                self.zap.authentication.set_authentication_method(
                    context_name,
                    'formBasedAuthentication',
                    f'loginUrl={login_url}&loginRequestData={login_request}'
                )
                user_id = self.zap.users.new_user(context_name, username)
                self.zap.users.set_authentication_credentials(
                    context_name,
                    user_id,
                    f'username={username}&password={password}'
                )
                self.zap.users.set_user_enabled(context_name, user_id, True)

            # Enable passive scanners for quick results
            self.zap.ascan.enable_all_scanners()

            # Set scan options for faster execution
            self.zap.ascan.set_option_attack_strength('LOW')
            self.zap.ascan.set_option_alert_threshold('LOW')
            
            print("Scanner configured successfully with passive scanning enabled.")
            return True

        except Exception as e:
            print(f"Error configuring scanner: {str(e)}")
            return False
    
    def run_passive_scan(self, target_url):
        """Run passive scan efficiently in a separate thread"""
        print(f"Running passive scan on {target_url}")
        self.zap.spider.scan(target_url)
        
        while int(self.zap.spider.status()) < 100:
            time.sleep(1)  # Reduced frequency of checking
        print("Passive scan completed!")

    def run_active_scan(self, target_url):
        """Run active scan efficiently in a separate thread"""
        print(f"Running active scan on {target_url}")
        scan_id = self.zap.ascan.scan(target_url)
        
        while int(self.zap.ascan.status(scan_id)) < 100:
            time.sleep(1)  # Reduced frequency of checking
        print("Active scan completed!")

    def get_comprehensive_alerts(self, target_url=None):
        """Get detailed alerts with additional metadata"""
        alerts = self.zap.alert.alerts(baseurl=target_url)
        
        comprehensive_alerts = []
        for alert in alerts:
            enhanced_alert = {
                'id': alert.get('id'),
                'name': alert.get('name'),
                'risk': alert.get('risk'),
                'confidence': alert.get('confidence'),
                'url': alert.get('url'),
                'method': alert.get('method'),
                'evidence': alert.get('evidence'),
                'attack': alert.get('attack'),
                'param': alert.get('param'),
                'request': {
                    'header': alert.get('requestHeader'),
                    'body': alert.get('requestBody')
                },
                'response': {
                    'header': alert.get('responseHeader'),
                    'body': alert.get('responseBody')
                },
                'description': alert.get('description'),
                'solution': alert.get('solution'),
                'reference': alert.get('reference'),
                'cweid': alert.get('cweid'),
                'wascid': alert.get('wascid'),
                'sourceid': alert.get('sourceid'),
                'timestamp': datetime.now().isoformat()
            }
            comprehensive_alerts.append(enhanced_alert)
        
        return comprehensive_alerts

# Example usage
if __name__ == "__main__":
    API_KEY = 'rsfb1hahkg7p13butsubmml2gk'
    TARGET_URL = 'https://your-target.com'
    
    scanner = ZAPVulnerabilityScanner(API_KEY)
    
    # Configure the scanner with optional authentication
    scanner.configure_scanner(
        context_name='default-context',
        target_url=TARGET_URL,
        username='your-username',  # Optional
        password='your-password',  # Optional
        login_url='https://your-target.com/login',  # Optional
        username_field='username',  # Optional
        password_field='password'  # Optional
    )
    
    # Create threads for passive and active scanning
    passive_thread = threading.Thread(target=scanner.run_passive_scan, args=(TARGET_URL,))
    active_thread = threading.Thread(target=scanner.run_active_scan, args=(TARGET_URL,))
    
    # Start threads for concurrent scanning
    passive_thread.start()
    active_thread.start()
    
    # Wait for both scans to complete
    passive_thread.join()
    active_thread.join()
    
    # Fetch and print comprehensive alerts after scans are completed
    alerts = scanner.get_comprehensive_alerts(TARGET_URL)
    for alert in alerts:
        print(alert)

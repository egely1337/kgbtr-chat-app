import requests
import secrets


spam = ["caydanligin", "alti", "fokur", "fokur", "anani", "sikeyim", "yusuf", "okur"]

def main():
    while 1:
        for i in spam:
            r = requests.post(
                url="https://animekizi.org/api/message",
                json={"message" : i},
                cookies={
                    "__Secure-next-auth.session-token" : "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..TDo__y1XEtRJcVyY.ezbPV-PBRS3hP2Pru2drRitZji3OkGAfGO3QmmG-B6_r2L_SR495WqbDgNt3-R4nA32pX7qr4XOFir9wjCo6VqYklEi6hQeGzn0YL3O902f7ViF7Aw-3YDukWWnH78Jp99kGyLjmS5xb6uyUb8BCfSPDZnytixMZj0bVNYm4AMwCVRk4LxU.60pbg_653Bx4nSwEOWKNpg"
                }
            )
        
        print(r.status_code)

main()
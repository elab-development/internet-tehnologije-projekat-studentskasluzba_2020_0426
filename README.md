Projekat se sastoji od jedne Laravel i jedne React aplikacije. 
potrebno je prvo pokrenuti laravel aplikaciju, a zatim i react aplikaciju

Koraci
1. Preuzeti projekat i otvoriti ga u VS Code 
2. Pokretanje Laravel aplikacije
   2.1 Otvoriti novi terminal i uneti sledece naredbe:
        cd ssLaravel
        composer install
        cp .env.example .env
        php artisan key:generate
   2.2 kreirati bazu podataka koja se zove isto kao u .env fajlu, a zatim nastaviti u terminalu
        php artisan migrate --seed
        php artisan serve 
3.  Pokretanje React aplikacije
     3.1 Otvoriti novi termina i uneti
          cd front
          npm install
          npm start

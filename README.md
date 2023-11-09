Create a database named "task_app". Changeable from .env file
Update your database credentials from .env file

Run the following commands:

composer install
npm install
php artisan migrate --seed
php artisan serve
npm run dev

the seeder will create a default admin for the project
admin mail: admin@example.com
admin password: admin@123

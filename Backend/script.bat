@echo off

echo Ejecutando migraciones...
php artisan migrate

echo Ejecutando seeders...
php artisan db:seed --class=DiosSeeder
php artisan db:seed --class=AccionSeeder
php artisan db:seed --class=HumanoSeeder
php artisan db:seed --class=AfinidadDiosHumanoSeeder
php artisan db:seed --class=EliminadoSeeder
php artisan db:seed --class=OraculoSeeder
php artisan db:seed --class=PruebaEleccionSeeder
php artisan db:seed --class=PruebaLibreSeeder
php artisan db:seed --class=PruebaValoracionSeeder
php artisan db:seed --class=ResultadoPruebaSeeder
php artisan db:seed --class=UserSeeder

echo Proceso completado.
pause
@echo off

echo Ejecutando migraciones...
php artisan migrate:reset
php artisan migrate

echo Ejecutando seeders...
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=DiosSeeder
php artisan db:seed --class=HumanoSeeder
php artisan db:seed --class=PruebaEleccionSeeder
php artisan db:seed --class=PruebaLibreSeeder
php artisan db:seed --class=PruebaValoracionSeeder
php artisan db:seed --class=OraculoSeeder
php artisan db:seed --class=ResultadoOraculoSeeder
php artisan db:seed --class=AsignacionOraculoSeeder


echo Proceso completado.
pause
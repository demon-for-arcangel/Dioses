@echo off

echo Ejecutando migraciones...
php artisan migrate:fresh --seed

echo Proceso completado.
pause
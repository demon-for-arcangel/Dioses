-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-02-2024 a las 14:20:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dioses`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignacion_oraculo`
--

CREATE TABLE `asignacion_oraculo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `dios_id` bigint(20) UNSIGNED NOT NULL,
  `oraculo_id` bigint(20) UNSIGNED NOT NULL,
  `humano_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `asignacion_oraculo`
--

INSERT INTO `asignacion_oraculo` (`id`, `dios_id`, `oraculo_id`, `humano_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, NULL, NULL),
(2, 1, 8, 1, NULL, NULL),
(3, 1, 9, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dios`
--

CREATE TABLE `dios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `dios`
--

INSERT INTO `dios` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, NULL),
(2, 2, NULL, NULL),
(3, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `humano`
--

CREATE TABLE `humano` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `destino` int(11) NOT NULL DEFAULT 0,
  `afinidad` int(11) NOT NULL,
  `fecha_muerte` varchar(255) DEFAULT NULL,
  `dios_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `humano`
--

INSERT INTO `humano` (`id`, `destino`, `afinidad`, `fecha_muerte`, `dios_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 0, 30, '20/06/2050', 1, 4, NULL, NULL),
(2, 0, 19, NULL, 3, 5, '2024-01-28 18:48:48', '2024-01-28 18:48:48'),
(3, 0, 7, NULL, 1, 6, '2024-01-28 19:03:51', '2024-01-28 19:03:51'),
(4, 0, 7, NULL, 1, 7, '2024-01-29 08:38:01', '2024-01-29 08:38:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(202, '2014_10_12_000000_create_users_table', 1),
(203, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(204, '2019_08_19_000000_create_failed_jobs_table', 1),
(205, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(206, '2023_12_25_115052_create_dios_table', 1),
(207, '2023_12_25_115052_create_prueba_eleccion_table', 1),
(208, '2023_12_25_115052_create_prueba_libre_table', 1),
(209, '2023_12_25_115052_create_prueba_valoracion_table', 1),
(210, '2023_12_25_115053_create_humano_table', 1),
(211, '2023_12_25_115056_create_oraculo_table', 1),
(212, '2023_12_25_115059_create_resultado_oraculo_table', 1),
(213, '2023_12_29_134909_create_asignacion_oraculo_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oraculo`
--

CREATE TABLE `oraculo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pregunta` varchar(255) NOT NULL,
  `tipo` enum('libre','eleccion','valoracion') NOT NULL,
  `cantidad_destino` int(11) NOT NULL,
  `prueba_libre_id` bigint(20) UNSIGNED DEFAULT NULL,
  `prueba_eleccion_id` bigint(20) UNSIGNED DEFAULT NULL,
  `prueba_valoracion_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `oraculo`
--

INSERT INTO `oraculo` (`id`, `pregunta`, `tipo`, `cantidad_destino`, `prueba_libre_id`, `prueba_eleccion_id`, `prueba_valoracion_id`, `created_at`, `updated_at`) VALUES
(1, '¿Cuál es tu destino?', 'libre', 70, 1, NULL, NULL, NULL, NULL),
(2, '¿Cuál es el secreto para ser feliz?', 'libre', 70, 2, NULL, NULL, NULL, NULL),
(3, '¿Por qué hay algo en vez de nada?', 'libre', 70, 3, NULL, NULL, NULL, NULL),
(4, '¿Es el altruismo real o un mito?', 'libre', 70, 4, NULL, NULL, NULL, NULL),
(5, '¿Tenemos libre albedrío?', 'libre', 70, 5, NULL, NULL, NULL, NULL),
(6, '¿Podemos experimentar el mundo de manera objetiva?', 'valoracion', 70, NULL, NULL, 1, NULL, NULL),
(7, '¿Existe una ética objetiva?', 'valoracion', 70, NULL, NULL, 2, NULL, NULL),
(8, '¿Le gustaría ser inmortal si pudiera?', 'valoracion', 70, NULL, NULL, 3, NULL, NULL),
(9, 'Estás en una casa y se declara un incendio.  Sólo puedes llevar una cosa y hay un gato y un cuadro muy valioso: ¿qué salvas?', 'eleccion', 70, NULL, 1, NULL, NULL, NULL),
(10, '¿Eres libre en tus elecciones?', 'eleccion', 70, NULL, 2, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 4, 'LaravelSanctumAuth', '40cd487dec25efd745fd7291da3d22c4093e5e8721a5810e748628280ac2fd65', '[\"*\"]', '2024-01-23 08:08:44', NULL, '2024-01-23 08:08:44', '2024-01-23 08:08:44'),
(2, 'App\\Models\\User', 4, 'LaravelSanctumAuth', '562d081d2fefbc0038a84aa85a2938b52f26012d2a32946cc43967c8fd1cbe52', '[\"*\"]', '2024-01-23 08:49:15', NULL, '2024-01-23 08:21:12', '2024-01-23 08:49:15'),
(3, 'App\\Models\\User', 4, 'LaravelSanctumAuth', '3bdcd45169339c8fac0a02fcc02114acc76ac6f29912eed206fc63d2cd86e0ff', '[\"*\"]', '2024-01-23 08:59:48', NULL, '2024-01-23 08:59:47', '2024-01-23 08:59:48'),
(4, 'App\\Models\\User', 4, 'LaravelSanctumAuth', '85fe68ad7df62e240ae6a08045f73e6d8b1bce4f2590a520ddf76415c04ca3cd', '[\"*\"]', '2024-01-23 09:02:39', NULL, '2024-01-23 09:02:38', '2024-01-23 09:02:39'),
(5, 'App\\Models\\User', 4, 'LaravelSanctumAuth', '8d9d61db56695ebb7767ff844db93649853b676b917562078fb8d2c6eed09dc3', '[\"*\"]', '2024-01-23 09:05:48', NULL, '2024-01-23 09:05:48', '2024-01-23 09:05:48'),
(6, 'App\\Models\\User', 4, 'LaravelSanctumAuth', 'eacd2f1b9d1106ff4a88e174a6fd3f04d95afd2920e1378c609abd450fc8c3b1', '[\"*\"]', '2024-01-23 09:08:02', NULL, '2024-01-23 09:08:02', '2024-01-23 09:08:02'),
(7, 'App\\Models\\User', 4, 'LaravelSanctumAuth', 'f6fd3dee568b251ba2c33dd15e1175e9daee470ec36d1544c38894a651b0f414', '[\"*\"]', '2024-01-23 09:09:26', NULL, '2024-01-23 09:09:26', '2024-01-23 09:09:26'),
(8, 'App\\Models\\User', 4, 'LaravelSanctumAuth', '3a4b8e49bf4d5ec04b4452614de357bc516a02d1363d1024d9f6393a652a7b4a', '[\"*\"]', '2024-01-23 09:11:35', NULL, '2024-01-23 09:11:35', '2024-01-23 09:11:35'),
(9, 'App\\Models\\User', 4, 'LaravelSanctumAuth', 'd0282c711221b10551587c75f200409727da7540dab9a4dfc0bb3437b7c209fb', '[\"*\"]', '2024-01-23 09:12:31', NULL, '2024-01-23 09:12:26', '2024-01-23 09:12:31'),
(10, 'App\\Models\\User', 4, 'LaravelSanctumAuth', '441e3b9941594c29aca89fd8baf4e828b0137c967c4e53e0f4a90864c41b290d', '[\"*\"]', '2024-01-23 09:13:59', NULL, '2024-01-23 09:13:52', '2024-01-23 09:13:59'),
(11, 'App\\Models\\User', 4, 'LaravelSanctumAuth', 'e323c791d386589c964f7d88cda62607983e72e6cf9c23af9dbf0b59a01116c2', '[\"*\"]', '2024-01-23 10:42:48', NULL, '2024-01-23 10:41:58', '2024-01-23 10:42:48'),
(12, 'App\\Models\\User', 4, 'LaravelSanctumAuth', '03876e94e508c56e514d41ed686e9caf822bb2ab3150fb82ee28cfebfee74681', '[\"*\"]', '2024-01-23 10:50:00', NULL, '2024-01-23 10:49:53', '2024-01-23 10:50:00'),
(13, 'App\\Models\\User', 4, 'LaravelSanctumAuth', '0dd4662a1eb56803b8d8b3fa65719afd96b7e883c8a331d7b347565ed5e5ca09', '[\"*\"]', '2024-01-23 10:55:06', NULL, '2024-01-23 10:55:00', '2024-01-23 10:55:06'),
(14, 'App\\Models\\User', 4, 'LaravelSanctumAuth', '6e722243e65f0c0c002534e938d9b8740bf38c6bb268714ab7dceb456ce4fa92', '[\"*\"]', '2024-01-23 10:56:54', NULL, '2024-01-23 10:56:37', '2024-01-23 10:56:54'),
(15, 'App\\Models\\User', 4, 'LaravelSanctumAuth', 'f4ef0a58d09598bc911df6de194cf563497f3be67bc2b56a81547b08cfc5b88f', '[\"*\"]', '2024-01-23 11:04:53', NULL, '2024-01-23 11:04:20', '2024-01-23 11:04:53'),
(16, 'App\\Models\\User', 4, 'LaravelSanctumAuth', '8e0d33d832c15c14f2a92b63425e946a70bbb4fee6f1b6011d05e8e3d0e78fca', '[\"*\"]', '2024-01-23 11:12:08', NULL, '2024-01-23 11:12:02', '2024-01-23 11:12:08'),
(17, 'App\\Models\\User', 4, 'LaravelSanctumAuth', 'a88152b949612f0437f15c52c8ddc85cb9800e3751725d603c92442b68999dad', '[\"*\"]', '2024-01-23 11:18:51', NULL, '2024-01-23 11:18:42', '2024-01-23 11:18:51'),
(18, 'App\\Models\\User', 4, 'LaravelSanctumAuth', 'f8727e5d8deed39081f20c4b0a94c2dc3b6945c5ebfa9fc2eb8060f47ddfc237', '[\"*\"]', '2024-01-23 11:41:55', NULL, '2024-01-23 11:41:46', '2024-01-23 11:41:55'),
(19, 'App\\Models\\User', 4, 'LaravelSanctumAuth', 'f5ab60a357b3aff18d8f304dd522404cb2e7078627069de88fa817b9d269cf56', '[\"*\"]', '2024-01-23 18:36:16', NULL, '2024-01-23 18:36:15', '2024-01-23 18:36:16'),
(20, 'App\\Models\\User', 4, 'LaravelSanctumAuth', '4dffcac829dec3f99bacc2281177a39ea2c285b7ce1f7b0c2ac0868589f4075c', '[\"*\"]', '2024-01-25 08:37:50', NULL, '2024-01-25 08:37:48', '2024-01-25 08:37:50'),
(21, 'App\\Models\\User', 1, 'LaravelSanctumAuth', '7da05b7a611590f558a975939f898dbfe0253f1e906a8eeeb4bcbeffb89a8dd1', '[\"*\"]', NULL, NULL, '2024-01-25 08:38:17', '2024-01-25 08:38:17'),
(22, 'App\\Models\\User', 1, 'LaravelSanctumAuth', '734513e6110f563c83aca773902ae9c60c8be1e12ab4019ca64704a4d180feec', '[\"*\"]', '2024-01-25 12:13:01', NULL, '2024-01-25 11:00:12', '2024-01-25 12:13:01'),
(23, 'App\\Models\\User', 4, 'LaravelSanctumAuth', '4e7d8baa6992fef1f326fd3cc0224de61c8acaaf7af8d40fdaeebf15ee547424', '[\"*\"]', '2024-01-25 11:43:03', NULL, '2024-01-25 11:00:19', '2024-01-25 11:43:03'),
(24, 'App\\Models\\User', 1, 'LaravelSanctumAuth', '44c84fc1ad0c59f7146f09a36e36d7b1ca864e1cb5a849a0d7df24638e5e2c8f', '[\"*\"]', '2024-01-25 11:15:56', NULL, '2024-01-25 11:15:45', '2024-01-25 11:15:56'),
(25, 'App\\Models\\User', 1, 'LaravelSanctumAuth', '008a555590e383a521e940deaa1c2fb85696248ee7d729c01a4904a6832b1140', '[\"*\"]', '2024-01-25 11:36:45', NULL, '2024-01-25 11:34:45', '2024-01-25 11:36:45'),
(26, 'App\\Models\\User', 1, 'LaravelSanctumAuth', 'f6163cbd613de7e817d3a7bba26f5916f5a5e62ccb1be2046418a379990eba05', '[\"*\"]', '2024-01-25 14:06:09', NULL, '2024-01-25 14:02:50', '2024-01-25 14:06:09'),
(27, 'App\\Models\\User', 4, 'LaravelSanctumAuth', '452eaff144be62f0a9f26e9b967eb92dd798c4c68495acca27c6e38fa37696e5', '[\"*\"]', '2024-01-25 14:02:57', NULL, '2024-01-25 14:02:56', '2024-01-25 14:02:57'),
(28, 'App\\Models\\User', 1, 'LaravelSanctumAuth', 'b0f671837fec84ef4d31462f22d4a56e9281fef8128ac0ccd9747fa8144245ed', '[\"*\"]', '2024-01-28 16:59:43', NULL, '2024-01-28 16:16:39', '2024-01-28 16:59:43'),
(29, 'App\\Models\\User', 1, 'LaravelSanctumAuth', 'fb73f6def6b1e7df68ee9402deadab2db52b4c58f5bb4abeed1c3c51e77a4d84', '[\"*\"]', '2024-01-28 19:03:51', NULL, '2024-01-28 19:01:43', '2024-01-28 19:03:51'),
(30, 'App\\Models\\User', 1, 'LaravelSanctumAuth', 'c5968413c93e2801e941c5ccc0080fdfe8167617a4fd3e4c6a856fd886070b9d', '[\"*\"]', '2024-01-29 07:25:07', NULL, '2024-01-29 07:03:40', '2024-01-29 07:25:07'),
(31, 'App\\Models\\User', 1, 'LaravelSanctumAuth', 'c194309c8ee267ca3114d58aa53aa2eafef8ac1a8b56cce6a2379212bb797c5a', '[\"*\"]', '2024-01-29 07:26:05', NULL, '2024-01-29 07:26:03', '2024-01-29 07:26:05'),
(32, 'App\\Models\\User', 1, 'LaravelSanctumAuth', 'ee4fec236ad23b7011ee7d4cd481704c0ecf2eb11a5698f5ad57e463cea41147', '[\"*\"]', '2024-01-29 08:51:17', NULL, '2024-01-29 08:17:56', '2024-01-29 08:51:17'),
(33, 'App\\Models\\User', 1, 'LaravelSanctumAuth', '80d76026c9c2ab9b7e17c25b84ebc9484fb9bc56a9bd3f68510ce560aeabee9b', '[\"*\"]', '2024-01-29 08:38:01', NULL, '2024-01-29 08:37:23', '2024-01-29 08:38:01'),
(34, 'App\\Models\\User', 1, 'LaravelSanctumAuth', '0ae05b2bdcf0b8f812d7034b2b6b95f862500ae31aafdf93a0610d9ff7ee9935', '[\"*\"]', '2024-01-29 10:09:38', NULL, '2024-01-29 10:05:58', '2024-01-29 10:09:38'),
(35, 'App\\Models\\User', 1, 'LaravelSanctumAuth', '82cc9f9c69df669c74b75e290b9dab6e18ca53e8e24f2dc20f3aa56b3038f3c8', '[\"*\"]', '2024-01-29 10:50:25', NULL, '2024-01-29 10:50:24', '2024-01-29 10:50:25'),
(36, 'App\\Models\\User', 1, 'LaravelSanctumAuth', 'b0f86b363a72f3a2e17e3a5493e6f87fcc4555328be85d82ca66fc0dc58efac0', '[\"*\"]', '2024-01-29 11:11:00', NULL, '2024-01-29 11:10:59', '2024-01-29 11:11:00'),
(37, 'App\\Models\\User', 1, 'LaravelSanctumAuth', 'f3601685f91856265a4b7142919713ce71ceeadd544469c14cba83e4562baf9f', '[\"*\"]', '2024-01-29 11:15:15', NULL, '2024-01-29 11:15:14', '2024-01-29 11:15:15'),
(38, 'App\\Models\\User', 1, 'LaravelSanctumAuth', 'a5b346ad42af9108b3703e4dedcfec07dadd290291a2489feb50d22535c4fa05', '[\"*\"]', '2024-01-29 11:25:41', NULL, '2024-01-29 11:25:41', '2024-01-29 11:25:41'),
(39, 'App\\Models\\User', 1, 'LaravelSanctumAuth', '79ea54735ca596c1680d88e8f9a5c7cc3e3f67a01ef1a349884bb4297fd78dd5', '[\"*\"]', '2024-01-29 11:31:17', NULL, '2024-01-29 11:31:16', '2024-01-29 11:31:17'),
(40, 'App\\Models\\User', 1, 'LaravelSanctumAuth', '2b1948c4f6976b68dfd3c0f82d00a5a4c867d7b6d91409cc1d8a3abfa28a405d', '[\"*\"]', '2024-01-30 06:46:16', NULL, '2024-01-30 06:46:15', '2024-01-30 06:46:16'),
(41, 'App\\Models\\User', 1, 'LaravelSanctumAuth', '8e91246a64d0e6956ba59f2730726def145388eb2d3349243ea122727dd96c3c', '[\"*\"]', '2024-02-01 12:13:43', NULL, '2024-02-01 12:11:31', '2024-02-01 12:13:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prueba_eleccion`
--

CREATE TABLE `prueba_eleccion` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `opcion_1` varchar(255) NOT NULL,
  `opcion_2` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `prueba_eleccion`
--

INSERT INTO `prueba_eleccion` (`id`, `opcion_1`, `opcion_2`, `created_at`, `updated_at`) VALUES
(1, 'Gato', 'Cuadro Valioso', NULL, NULL),
(2, 'Si', 'No', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prueba_libre`
--

CREATE TABLE `prueba_libre` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `palabra_clave` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `prueba_libre`
--

INSERT INTO `prueba_libre` (`id`, `palabra_clave`, `created_at`, `updated_at`) VALUES
(1, 'destino', NULL, NULL),
(2, 'felicidad', NULL, NULL),
(3, 'nada', NULL, NULL),
(4, 'mito', NULL, NULL),
(5, 'si', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prueba_valoracion`
--

CREATE TABLE `prueba_valoracion` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `valor_maximo` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `prueba_valoracion`
--

INSERT INTO `prueba_valoracion` (`id`, `valor_maximo`, `created_at`, `updated_at`) VALUES
(1, 3, NULL, NULL),
(2, 4, NULL, NULL),
(3, 5, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultado_oraculo`
--

CREATE TABLE `resultado_oraculo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `humano_id` bigint(20) UNSIGNED NOT NULL,
  `prueba_id` bigint(20) UNSIGNED NOT NULL,
  `resultado` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `resultado_oraculo`
--

INSERT INTO `resultado_oraculo` (`id`, `humano_id`, `prueba_id`, `resultado`, `created_at`, `updated_at`) VALUES
(9, 1, 8, '3', '2024-01-23 10:56:54', '2024-01-23 10:56:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo` enum('dios','humano') NOT NULL,
  `sabiduria` int(11) DEFAULT NULL,
  `nobleza` int(11) DEFAULT NULL,
  `virtud` int(11) DEFAULT NULL,
  `maldad` int(11) DEFAULT NULL,
  `audacia` int(11) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `nombre`, `email`, `password`, `tipo`, `sabiduria`, `nobleza`, `virtud`, `maldad`, `audacia`, `email_verified_at`, `created_at`, `updated_at`) VALUES
(1, 'Zeus', 'zeus@gmail.com', '$2y$12$cR0yXDUE4/5rEQcVV6xHdO4U0LE12MojgWo/gO.vukSiXfswFLzP.', 'dios', 5, 3, 1, 2, 5, NULL, NULL, NULL),
(2, 'Poseidón', 'poseidon@gmail.com', '$2y$12$ExohFiBsz9Hwd9lpYcwsn.PyKMur094WXfqpWI.Exf3/jdANYOUCq', 'dios', 5, 4, 2, 2, 5, NULL, NULL, NULL),
(3, 'Hades', 'hades@gmail.com', '$2y$12$XiD6b3NHXzfLPZAld9DF0eWYExbSnbYkImCiY43.nk1FlMjJ5FD7y', 'dios', 5, 4, 4, 4, 2, NULL, NULL, NULL),
(4, 'Usuario1', 'usuario1@gmail.com', '$2y$12$VP2WrOkZ2Qtt1yrifLe2DeR7fOWWljdWpO8EHN1aPmoCyxCxF2ib.', 'humano', 3, 2, 2, 5, 1, NULL, NULL, NULL),
(5, 'Marina', 'marina@gmail.com', '$2y$12$3amAhwWo2G7NePFTZJT7BO85aha3USAQHy5TJKqj7T.y319xyYDsO', 'humano', NULL, NULL, NULL, NULL, NULL, NULL, '2024-01-28 18:48:48', '2024-01-28 18:48:48'),
(6, 'Lucas', 'lucas@gmail.com', '$2y$12$Usz5NU/9LSemDMuKmu7naOeIzF7DUbBXbAsfMtFP1/Ht7V6HjBQTq', 'humano', 2, 3, 1, 5, 4, NULL, '2024-01-28 19:03:51', '2024-01-28 19:03:51'),
(7, 'prueba', 'prueba@gmail.com', '$2y$12$XBUZXYwlgyin1bPzsPrObuoDhhRh8GpW2lz0HeVORLWhHZAcg7Pry', 'humano', 2, 3, 1, 5, 4, NULL, '2024-01-29 08:38:01', '2024-01-29 08:38:01');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignacion_oraculo`
--
ALTER TABLE `asignacion_oraculo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `asignacion_oraculo_dios_id_foreign` (`dios_id`),
  ADD KEY `asignacion_oraculo_oraculo_id_foreign` (`oraculo_id`),
  ADD KEY `asignacion_oraculo_humano_id_foreign` (`humano_id`);

--
-- Indices de la tabla `dios`
--
ALTER TABLE `dios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dios_user_id_foreign` (`user_id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `humano`
--
ALTER TABLE `humano`
  ADD PRIMARY KEY (`id`),
  ADD KEY `humano_user_id_foreign` (`user_id`),
  ADD KEY `humano_dios_id_foreign` (`dios_id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `oraculo`
--
ALTER TABLE `oraculo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oraculo_prueba_libre_id_foreign` (`prueba_libre_id`),
  ADD KEY `oraculo_prueba_eleccion_id_foreign` (`prueba_eleccion_id`),
  ADD KEY `oraculo_prueba_valoracion_id_foreign` (`prueba_valoracion_id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `prueba_eleccion`
--
ALTER TABLE `prueba_eleccion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `prueba_libre`
--
ALTER TABLE `prueba_libre`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `prueba_valoracion`
--
ALTER TABLE `prueba_valoracion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resultado_oraculo`
--
ALTER TABLE `resultado_oraculo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `resultado_oraculo_humano_id_foreign` (`humano_id`),
  ADD KEY `resultado_oraculo_prueba_id_foreign` (`prueba_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignacion_oraculo`
--
ALTER TABLE `asignacion_oraculo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `dios`
--
ALTER TABLE `dios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `humano`
--
ALTER TABLE `humano`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;

--
-- AUTO_INCREMENT de la tabla `oraculo`
--
ALTER TABLE `oraculo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `prueba_eleccion`
--
ALTER TABLE `prueba_eleccion`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `prueba_libre`
--
ALTER TABLE `prueba_libre`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `prueba_valoracion`
--
ALTER TABLE `prueba_valoracion`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `resultado_oraculo`
--
ALTER TABLE `resultado_oraculo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignacion_oraculo`
--
ALTER TABLE `asignacion_oraculo`
  ADD CONSTRAINT `asignacion_oraculo_dios_id_foreign` FOREIGN KEY (`dios_id`) REFERENCES `dios` (`id`),
  ADD CONSTRAINT `asignacion_oraculo_humano_id_foreign` FOREIGN KEY (`humano_id`) REFERENCES `humano` (`id`),
  ADD CONSTRAINT `asignacion_oraculo_oraculo_id_foreign` FOREIGN KEY (`oraculo_id`) REFERENCES `oraculo` (`id`);

--
-- Filtros para la tabla `dios`
--
ALTER TABLE `dios`
  ADD CONSTRAINT `dios_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `humano`
--
ALTER TABLE `humano`
  ADD CONSTRAINT `humano_dios_id_foreign` FOREIGN KEY (`dios_id`) REFERENCES `dios` (`id`),
  ADD CONSTRAINT `humano_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `oraculo`
--
ALTER TABLE `oraculo`
  ADD CONSTRAINT `oraculo_prueba_eleccion_id_foreign` FOREIGN KEY (`prueba_eleccion_id`) REFERENCES `prueba_eleccion` (`id`),
  ADD CONSTRAINT `oraculo_prueba_libre_id_foreign` FOREIGN KEY (`prueba_libre_id`) REFERENCES `prueba_libre` (`id`),
  ADD CONSTRAINT `oraculo_prueba_valoracion_id_foreign` FOREIGN KEY (`prueba_valoracion_id`) REFERENCES `prueba_valoracion` (`id`);

--
-- Filtros para la tabla `resultado_oraculo`
--
ALTER TABLE `resultado_oraculo`
  ADD CONSTRAINT `resultado_oraculo_humano_id_foreign` FOREIGN KEY (`humano_id`) REFERENCES `humano` (`id`),
  ADD CONSTRAINT `resultado_oraculo_prueba_id_foreign` FOREIGN KEY (`prueba_id`) REFERENCES `oraculo` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

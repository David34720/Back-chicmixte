-- ----------------------------------------
-- Base de données :  " ??? "
-- ----------------------------------------
BEGIN;
-- Insérer un utilisateur "Laly" qui est administrateur dans la table "user"
INSERT INTO "users" (email, firstname, lastname, password, admin, level, img, created_at, updated_at)
VALUES 
('laly@game.fr', 'Laly', 'Lapin', 'laly', TRUE, 1, 'image_url', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('papa@game.fr', 'Papa', 'Lapin', 'papa', TRUE, 1, 'image_url', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);




COMMIT;

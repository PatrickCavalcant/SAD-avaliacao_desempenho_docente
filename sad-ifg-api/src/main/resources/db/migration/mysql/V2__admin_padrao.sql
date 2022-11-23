INSERT INTO `empresa` (`id`, `cnpj`, `data_atualizacao`, `data_criacao`, `razao_social`) 
VALUES (NULL, '82198127000121', CURRENT_DATE(), CURRENT_DATE(), 'Administrador Swagger');

INSERT INTO `usuario` (`id`, `cpf`, `data_atualizacao`, `data_criacao`, `email`, `nome`,
`perfil`, `senha`, `empresa_id`) 
VALUES (NULL, '16248890935', CURRENT_DATE(), CURRENT_DATE(), 'admin.swagger@empresa.com', 'ADMIN', 'ROLE_ADMIN',
'$2a$06$xIvBeNRfS65L1N17I7JzgefzxEuLAL0Xk0wFAgIkoNqu9WD6rmp4m', 
(SELECT `id` FROM `empresa` WHERE `cnpj` = '82198127000121'));



Cores para modo Acessibilidade: 
#ec4010
#07bc5d
#1004e7

Level up Trigger:

CREATE DEFINER=`root`@`localhost` TRIGGER `lvl_up` BEFORE UPDATE ON `character` FOR EACH ROW BEGIN
    DECLARE level_threshold INT;
        SET level_threshold = (NEW.level + 1) * 4 * NEW.tier;

    WHILE NEW.experience >= level_threshold DO
        SET NEW.level = NEW.level + 1;
        
        IF NEW.level IN (5, 11, 17) THEN
			SET NEW.tier = NEW.tier + 1;
        END IF;
        
        SET NEW.experience = NEW.experience - level_threshold;
        SET level_threshold = (NEW.level + 1) * 4 * NEW.tier;
        
    END WHILE;
END



Triggers do Calendário

CREATE DEFINER=`root`@`localhost` TRIGGER `campaign_BEFORE_UPDATE` BEFORE UPDATE ON `campaign` FOR EACH ROW BEGIN

    -- Ajusta a contagem do dia da semana com base no dia do mês
		SET NEW.weekDay = (NEW.monthDay) % 6;
		IF NEW.weekDay = 0 THEN
			SET NEW.weekDay = 6;
		END IF;

    -- Controle do tempo do dia (1-4)
    WHILE NEW.timeOfDay > 4 DO
        SET NEW.timeOfDay = NEW.timeOfDay - 4;
        SET NEW.monthDay = NEW.monthDay + 1;
    END WHILE;

    -- Controle dos dias da semana (1-6)
    WHILE NEW.weekDay > 6 DO
        SET NEW.weekDay = NEW.weekDay - 6;
    END WHILE;

    -- Controle dos dias do mês (1-30)
    WHILE NEW.monthDay > 30 DO
        SET NEW.monthDay = NEW.monthDay - 30;
        SET NEW.month = NEW.month + 1;
    END WHILE;

    -- Controle dos meses (1-12)
    WHILE NEW.month > 12 DO
        SET NEW.month = NEW.month - 12;
        SET NEW.year = NEW.year + 1;
    END WHILE;

    -- Controle dos anos (Máximo 3000)
    WHILE NEW.year > 3000 DO
        SET NEW.year = NEW.year - 3000;
        SET NEW.era = NEW.era + 1;
    END WHILE;

END
END

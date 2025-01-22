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

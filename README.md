Cores para modo Acessibilidade: 
#ec4010
#07bc5d
#1004e7

Level up Trigger:
/*
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
*/


Triggers do Calendário
/*
CREATE DEFINER = CURRENT_USER TRIGGER `test`.`campaign_BEFORE_UPDATE` BEFORE UPDATE ON `campaign` FOR EACH ROW
BEGIN
    IF NEW.timeOfDay > 4 THEN
		SET NEW.timeOfDay = 1;
        SET NEW.monthDay = NEW.monthDay +1;
    END IF;
    
    IF NEW.weekDay > 6 THEN
		SET NEW.weekDay = 1;
    END IF;
    
    IF NEW.monthDay > 30 THEN
		SET NEW.monthDay = 1;
        SET NEW.month = NEW.month +1;
    END IF;
    
    IF NEW.month > 12 THEN
		SET NEW.month = 1;
        SET NEW.year = NEW.year +1;
    END IF;
    
    IF NEW.year > 3000 THEN
		SET NEW.year = 1;
        SET NEW.era = NEW.era +1;
    END IF;
    
END

*/

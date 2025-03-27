/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.4.28-MariaDB : Database - employment_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`employment_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `employment_db`;

/*Table structure for table `companies` */

DROP TABLE IF EXISTS `companies`;

CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `email` varchar(75) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `website` varchar(50) DEFAULT NULL,
  `foundation_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `employees_avgnumber` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `companies` */

insert  into `companies`(`id`,`name`,`address`,`description`,`email`,`phone`,`website`,`foundation_date`,`employees_avgnumber`) values (1,'TechNova Solutions','123 Silicon Ave, San Salvador','Software solutions provider','info@technova.com','2222-1234','www.technova.com','2010-06-15 00:00:00',120),(2,'HealthLink','45 Wellness Blvd, Santa Tecla','Healthcare IT systems','contact@healthlink.com','2333-5566','www.healthlink.com','2005-03-20 00:00:00',80),(3,'AgroSmart','78 Greenway, Sonsonate','Agri-tech and smart farming tools','admin@agrosmart.com','2444-7890','www.agrosmart.com','2012-09-01 00:00:00',60),(4,'EduCore','12 Learning Rd, San Miguel','E-learning solutions for schools','support@educore.com','2555-1122','www.educore.com','2014-02-10 00:00:00',50),(5,'FinTech Global','7 Finance Ave, La Libertad','Digital banking and fintech services','team@fintechglobal.com','2666-7788','www.fintechglobal.com','2008-11-22 00:00:00',200),(6,'SoftLogix','9 Developer St, San Salvador','Custom enterprise software development','hello@softlogix.com','2111-3322','www.softlogix.com','2011-04-18 00:00:00',75),(7,'BuildWise','65 Concrete Ln, Santa Ana','Construction project management software','contact@buildwise.com','2777-8899','www.buildwise.com','2013-12-01 00:00:00',40),(8,'GreenWorld Energy','32 Eco Park, Ahuachapán','Renewable energy systems and monitoring','eco@greenworld.com','2999-1234','www.greenworld.com','2016-07-30 00:00:00',35),(9,'MediTrack','29 Clinic Dr, San Salvador','Patient tracking and medical records','info@meditrack.com','2112-3344','www.meditrack.com','2009-05-25 00:00:00',90),(10,'SecureNet','14 Cybersec St, La Unión','Cybersecurity and network auditing','security@securenet.com','2888-5566','www.securenet.com','2018-01-05 00:00:00',65),(11,'FreshFarm Co.','77 Harvest Rd, Usulután','Organic farming and produce distribution','contact@freshfarm.com','2100-4567','www.freshfarm.com','2013-03-01 00:00:00',25),(12,'CloudEdge','22 DevCloud Ave, San Salvador','Cloud architecture and SaaS','info@cloudedge.com','2122-8899','www.cloudedge.com','2017-08-14 00:00:00',100),(13,'AeroDyn','56 AirTech Park, La Paz','Aerospace engineering and aircraft testing','support@aerodyn.com','2345-6789','www.aerodyn.com','2006-04-23 00:00:00',150),(14,'BrightPath Education','9 Scholars Ln, Santa Tecla','Private tutoring and e-learning solutions','hello@brightpath.com','2200-3344','www.brightpath.com','2015-06-10 00:00:00',45),(15,'SunStream Energy','101 Solar Blvd, Chalatenango','Renewable solar panel solutions','contact@sunstream.com','2225-9988','www.sunstream.com','2019-03-22 00:00:00',38),(16,'LegalTrust Group','303 Justice Ave, San Vicente','Legal consulting and compliance services','info@legaltrust.com','2990-1122','www.legaltrust.com','2010-10-01 00:00:00',30),(17,'SafeTrack Logistics','44 Cargo Way, San Salvador','Supply chain and logistics optimization','jobs@safetrack.com','2877-0099','www.safetrack.com','2003-07-19 00:00:00',110),(18,'Foodies United','11 Bistro Street, La Libertad','Restaurant group with multi-brand kitchens','jobs@foodiesunited.com','2567-1234','www.foodiesunited.com','2018-11-09 00:00:00',150),(19,'CoreFit Wellness','99 Muscle Ave, Santa Ana','Fitness centers and wellness programs','coach@corefit.com','2011-4444','www.corefit.com','2016-01-01 00:00:00',60),(20,'GlobeSecure','500 SafeNet Drive, La Unión','Security audits and personal protection','security@globesecure.com','2110-2345','www.globesecure.com','2011-09-13 00:00:00',70),(21,'AutoPulse Motors','31 Engine Rd, Sonsonate','Vehicle manufacturing and parts distribution','jobs@autopulse.com','2144-5678','www.autopulse.com','2005-05-11 00:00:00',170),(22,'Inspire Events','42 Fiesta Plaza, San Miguel','Event planning, weddings, and corporate retreats','events@inspire.com','2455-9988','www.inspireevents.com','2012-10-20 00:00:00',30),(23,'EduBridge Academy','61 University Blvd, La Libertad','Private university and training center','admin@edubridge.com','2444-1111','www.edubridge.com','2004-01-15 00:00:00',220),(24,'Pixellence Media','38 Design St, San Salvador','Multimedia, digital publishing, and marketing','jobs@pixellence.com','2789-0000','www.pixellence.com','2017-06-06 00:00:00',48),(25,'Farmacia El Bienestar','88 Pharma Lane, Usulután','Pharmacy chain and drug distribution','hr@bienestar.com','2677-4343','www.bienestar.com','2001-02-28 00:00:00',130),(26,'ResQ Health','74 Health Rd, San Miguel','Emergency healthcare, ambulance services','contact@resqhealth.com','2500-1111','www.resqhealth.com','2009-12-12 00:00:00',80),(27,'SafeKids Center','18 Nanny St, Santa Tecla','Childcare, after-school, and babysitting services','jobs@safekids.com','2012-2121','www.safekids.com','2013-04-30 00:00:00',25),(28,'WorldAid NGO','5 Humanitarian Rd, La Libertad','Non-profit for education and food security','jobs@worldaid.org','2666-2200','www.worldaid.org','2010-08-08 00:00:00',60),(29,'ElSal Courier Express','23 Delivery Blvd, San Salvador','Nationwide shipping and courier services','hr@courierexpress.com','2777-0011','www.elsalcourier.com','2014-05-01 00:00:00',75),(30,'Hotel Sol Tropical','102 Beachfront Ave, La Libertad','Beachside resort and hospitality services','careers@soltropical.com','2999-4455','www.soltropical.com','2011-07-21 00:00:00',120),(32,'Miners DK','Dakota','A mining company','minersdakota@us.com','+12572625142','www.minersdakota.com','2022-06-22 06:00:00',500),(33,'World Gym','San Salvador, Colonia Miralvalle','The biggest gym at the world','worldgym@gmail.com','+503 25251414','www.worldgym.com','2018-02-06 06:00:00',400),(38,'Miner DK','Dakota','A mining company','minersdakota@us.com','343433333','http://www.minersdakota.com','2023-06-06 06:00:00',500);

/*Table structure for table `email_verifications` */

DROP TABLE IF EXISTS `email_verifications`;

CREATE TABLE `email_verifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ROLEID_FK` (`role_id`),
  CONSTRAINT `ROLEID_FK` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `email_verifications` */

/*Table structure for table `job_application` */

DROP TABLE IF EXISTS `job_application`;

CREATE TABLE `job_application` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `request_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `USERID_FK` (`user_id`),
  KEY `JOBID_FK` (`job_id`),
  KEY `STATUSID_FK` (`status_id`),
  CONSTRAINT `JOBID_FK` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`),
  CONSTRAINT `STATUSID_FK` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  CONSTRAINT `USERID_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `job_application` */

/*Table structure for table `job_application_history` */

DROP TABLE IF EXISTS `job_application_history`;

CREATE TABLE `job_application_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_app_id` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `updated_at` datetime NOT NULL,
  `comment` varchar(255) NOT NULL,
  `updated_status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `JOBAPP_FK` (`job_app_id`),
  KEY `UPDATEDBY_FK` (`updated_by`),
  KEY `STATUS_FK` (`updated_status`),
  CONSTRAINT `JOBAPP_FK` FOREIGN KEY (`job_app_id`) REFERENCES `job_application` (`id`),
  CONSTRAINT `STATUS_FK` FOREIGN KEY (`updated_status`) REFERENCES `status` (`id`),
  CONSTRAINT `UPDATEDBY_FK` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `job_application_history` */

/*Table structure for table `job_categories` */

DROP TABLE IF EXISTS `job_categories`;

CREATE TABLE `job_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `job_categories` */

insert  into `job_categories`(`id`,`name`,`description`) values (1,'Accounting & Finance','Jobs in accounting, auditing, tax, and financial services'),(2,'Administrative & Office Support','Administrative assistants, clerks, receptionists, and back-office roles'),(3,'Business & Strategy','Business development, strategy, consulting, and executive leadership roles'),(4,'Customer Service','Call center, client support, service representatives'),(5,'Human Resources','Recruiters, HR managers, talent acquisition, and payroll'),(6,'Legal','Attorneys, paralegals, legal clerks, and compliance professionals'),(7,'Marketing & Advertising','Marketing managers, SEO specialists, brand strategists, and ad buyers'),(8,'Project & Program Management','Scrum masters, product owners, project coordinators and managers'),(9,'Product Management','Product managers and strategists working on software or physical products'),(10,'Sales','Sales representatives, account managers, business development'),(11,'Public Relations & Communications','PR managers, corporate communication, and media relations'),(12,'Software Development','Frontend, backend, full-stack, mobile and web developers'),(13,'Information Technology (IT)','Sysadmins, IT support, DevOps, and general IT roles'),(14,'Data & Analytics','Data scientists, analysts, BI developers, statisticians'),(15,'Cybersecurity','Security analysts, penetration testers, and risk analysts'),(16,'UI/UX & Product Design','UX researchers, UI designers, product designers'),(17,'AI & Machine Learning','ML engineers, AI researchers, NLP specialists'),(18,'Game Development','Game designers, developers, and testers'),(19,'Telecommunications','Network engineers, mobile service technicians, telecom analysts'),(20,'Education & Training','Teachers, tutors, school admins, instructional designers'),(21,'Higher Education','University professors, lecturers, academic advisors'),(22,'Science & Research','Scientists, lab techs, researchers, PhD-level professionals'),(23,'Librarianship & Archiving','Librarians, museum curators, archivists'),(24,'Healthcare','Doctors, nurses, therapists, and medical technicians'),(25,'Healthcare Administration','Medical billing, hospital admins, health policy'),(26,'Pharmaceutical & Biotech','Pharma reps, clinical researchers, regulatory specialists'),(27,'Veterinary Services','Veterinarians, vet techs, animal health specialists'),(28,'Mental Health & Counseling','Psychologists, therapists, counselors'),(29,'Arts & Design','Graphic design, illustrators, 3D artists, visual artists'),(30,'Entertainment & Media','TV, film, podcasting, video editing, acting'),(31,'Writing & Editing','Copywriters, content creators, editors, journalists'),(32,'Photography & Videography','Photographers, videographers, drone operators'),(33,'Government & Public Administration','Civil servants, public policy analysts'),(34,'Military & Defense','Military personnel, defense contractors'),(35,'Law Enforcement & Security','Police, security guards, investigators'),(36,'Non-Profit & NGOs','Program coordinators, fundraisers, social impact jobs'),(37,'Construction & Skilled Trades','Electricians, carpenters, plumbers, general laborers'),(38,'Manufacturing & Production','Assembly, operators, machinists, factory supervisors'),(39,'Installation & Maintenance','HVAC, mechanics, field technicians'),(40,'Logistics & Supply Chain','Drivers, dispatchers, warehouse staff, logistics managers'),(41,'Transportation','Truckers, delivery drivers, shipping and aviation logistics'),(42,'Cleaning & Sanitation','Janitors, cleaners, sanitation workers'),(43,'Food & Hospitality','Chefs, waiters, hotel staff, event planners'),(44,'Beauty & Wellness','Hair stylists, massage therapists, estheticians'),(45,'Travel & Tourism','Tour guides, travel agents, airline staff'),(46,'Banking','Loan officers, branch staff, mortgage specialists'),(47,'Investment & Wealth Management','Portfolio managers, advisors, traders'),(48,'Insurance','Underwriters, adjusters, claims specialists'),(49,'Real Estate','Realtors, brokers, property managers'),(50,'Farming & Agriculture','Farm workers, agronomists, agri-tech roles'),(51,'Environmental Services','Environmental scientists, sustainability officers, waste management'),(52,'Energy & Utilities','Oil, gas, nuclear, water, electrical services'),(53,'Renewable Energy','Solar, wind, and sustainable energy engineers'),(54,'Aerospace & Aviation','Pilots, aerospace engineers, aviation mechanics'),(55,'Automotive','Mechanics, dealership staff, parts specialists'),(56,'Sports, Fitness & Recreation','Trainers, coaches, athletes, recreation staff'),(57,'E-commerce & Retail','Online store staff, merchandisers, warehouse packers'),(58,'Childcare & Nannying','Babysitters, daycare, private nannies'),(59,'Translation & Localization','Translators, interpreters, localization managers'),(60,'Others','Jobs that don’t fit in any standard category');

/*Table structure for table `jobs` */

DROP TABLE IF EXISTS `jobs`;

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `description` varchar(100) NOT NULL,
  `category_id` int(11) NOT NULL,
  `company_id` int(100) NOT NULL,
  `salary` double NOT NULL,
  `requirements` varchar(1000) NOT NULL,
  `email_contact` varchar(50) DEFAULT NULL,
  `phone_contact` varchar(15) DEFAULT NULL,
  `vacancies` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CATEGORY_FK` (`category_id`),
  KEY `COMPANY_FK` (`company_id`),
  KEY `CREATEDBY_FK` (`created_by`),
  CONSTRAINT `CATEGORY_FK` FOREIGN KEY (`category_id`) REFERENCES `job_categories` (`id`),
  CONSTRAINT `COMPANY_FK` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `CREATEDBY_FK` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `jobs` */

insert  into `jobs`(`id`,`name`,`description`,`category_id`,`company_id`,`salary`,`requirements`,`email_contact`,`phone_contact`,`vacancies`,`created_by`) values (1,'Full Stack Developer','Develop modern web apps with backend integration',12,1,1800,'React, Node.js, PostgreSQL, 2+ years experience','jobs@technova.com','2222-1234',2,15),(2,'DevOps Engineer','Manage CI/CD and deployment pipelines in cloud',13,12,2100,'AWS, Docker, Kubernetes, GitLab CI','hr@cloudedge.com','2122-8899',1,24),(3,'Registered Nurse','Provide patient care and medical assistance',24,26,1550,'Nursing license, CPR certified','careers@resqhealth.com','2500-1111',3,15),(4,'Accountant','Manage financial statements and monthly reporting',1,5,1600,'CPA preferred, Excel, QuickBooks','finance@fintechglobal.com','2666-7788',1,15),(5,'Cybersecurity Analyst','Monitor systems for security breaches',15,10,2300,'Network security, SIEM, penetration testing','security@securenet.com','2888-5566',2,24),(6,'Marketing Coordinator','Plan and execute marketing campaigns',7,6,1350,'Email marketing, SEO, Google Ads','marketing@softlogix.com','2111-3322',1,24),(7,'Construction Project Manager','Oversee residential construction software rollouts',8,7,1700,'PM tools, industry knowledge, leadership','contact@buildwise.com','2777-8899',1,15),(8,'Solar Installation Technician','Install and maintain solar panels on rooftops',53,15,1250,'Field work, electrical knowledge, teamwork','eco@sunstream.com','2225-9988',3,24),(9,'University Professor - Math','Teach math to undergraduate students',21,23,2100,'Master’s degree, teaching experience','admin@edubridge.com','2444-1111',2,15),(10,'Childcare Assistant','Supervise toddlers and provide care',58,27,950,'Patience, child safety knowledge, CPR','jobs@safekids.com','2012-2121',2,15),(11,'Warehouse Supervisor','Manage logistics and inventory',40,17,1350,'Forklift, Excel, warehouse software','jobs@safetrack.com','2877-0099',1,15),(12,'Pharmacist','Dispense medications and advise patients',26,25,1900,'Pharmacy license, attention to detail','hr@bienestar.com','2677-4343',1,24),(13,'AI Engineer','Design and deploy machine learning models',17,1,2400,'Python, TensorFlow, data pipelines','ai@technova.com','2222-1234',1,15),(14,'Graphic Designer','Design graphics for web and print',29,24,1300,'Photoshop, Illustrator, Figma','jobs@pixellence.com','2789-0000',1,15),(15,'Fitness Instructor','Lead group training sessions and 1-on-1 coaching',56,19,1000,'Personal trainer cert, energy, CPR','coach@corefit.com','2011-4444',2,24),(16,'Legal Assistant','Assist legal team with case documentation',6,16,1400,'Law background, organization, MS Office','info@legaltrust.com','2990-1122',1,15),(17,'Event Planner','Coordinate weddings and corporate events',43,22,1150,'Creativity, scheduling tools, communication','events@inspire.com','2455-9988',1,15),(18,'Agricultural Engineer','Implement smart farming solutions',50,3,1600,'Sensors, irrigation systems, field visits','careers@agrosmart.com','2444-7890',1,24),(19,'Mobile Developer','Build Android and iOS apps for clients',12,6,1700,'Flutter or React Native, Git','dev@softlogix.com','2111-3322',1,24),(20,'Support Technician','IT support for clients and internal users',13,2,1100,'Windows, Linux, customer support','support@healthlink.com','2333-5566',2,15),(21,'Frontend Developer','Build responsive web interfaces',12,1,1650,'HTML, CSS, JavaScript, React','jobs@technova.com','2222-1234',2,15),(22,'QA Tester','Test software for bugs and performance',13,6,1350,'Selenium, Cypress, documentation','qa@softlogix.com','2111-3322',1,24),(23,'Cloud Engineer','Maintain cloud infrastructure',13,12,1900,'Azure, AWS, CI/CD pipelines','hr@cloudedge.com','2122-8899',1,15),(24,'Financial Analyst','Analyze financial data and forecasts',1,5,1700,'Excel, SQL, accounting knowledge','finance@fintechglobal.com','2666-7788',1,24),(25,'HR Manager','Lead hiring and HR operations',5,6,1500,'HRIS systems, conflict resolution','hr@softlogix.com','2111-3322',1,24),(26,'Sales Executive','Identify and close B2B sales',10,1,1600,'CRM tools, negotiation skills','sales@technova.com','2222-1234',2,15),(27,'Content Writer','Create blog and marketing content',31,24,1100,'SEO, grammar, writing samples','jobs@pixellence.com','2789-0000',1,15),(28,'Social Media Manager','Manage social media presence',7,24,1200,'Instagram, LinkedIn, analytics','marketing@pixellence.com','2789-0000',1,24),(29,'UI/UX Designer','Design intuitive mobile and web interfaces',16,6,1600,'Figma, UX research, wireframes','ux@softlogix.com','2111-3322',1,15),(30,'Electrician','Install and troubleshoot wiring systems',37,7,1300,'License, residential/commercial wiring','jobs@buildwise.com','2777-8899',2,24),(31,'Plumber','Fix water systems and pipes',37,7,1200,'Experience with construction plumbing','jobs@buildwise.com','2777-8899',1,15),(32,'Forklift Operator','Operate warehouse equipment',40,17,1050,'Certification, warehouse safety','jobs@safetrack.com','2877-0099',1,24),(33,'Logistics Coordinator','Track and manage shipments',40,17,1400,'ERP systems, communication','jobs@safetrack.com','2877-0099',1,15),(34,'Paramedic','Respond to emergency medical calls',24,26,1500,'Certified EMT, CPR','jobs@resqhealth.com','2500-1111',1,24),(35,'Pharmacy Technician','Support pharmacist in retail store',26,25,1100,'Inventory, customer service','hr@bienestar.com','2677-4343',1,15),(36,'Medical Receptionist','Schedule appointments and greet patients',25,2,1000,'Clerical experience, soft skills','hr@healthlink.com','2333-5566',1,15),(37,'Waiter/Waitress','Serve food and handle customer orders',43,18,800,'Customer service, POS system','jobs@foodiesunited.com','2567-1234',3,24),(38,'Hotel Front Desk Agent','Check-in guests and manage reservations',43,30,950,'Hospitality experience, English','careers@soltropical.com','2999-4455',2,15),(39,'Chef Assistant','Help main chef with food prep',43,18,1050,'Kitchen hygiene, culinary basics','jobs@foodiesunited.com','2567-1234',1,24),(40,'English Teacher','Teach English to middle school students',20,14,1200,'Bachelor’s in Education, lesson planning','jobs@brightpath.com','2200-3344',1,24),(41,'Science Lab Technician','Support science experiments in lab',22,4,1400,'Lab tools, chemistry safety','support@educore.com','2555-1122',1,15),(42,'Nanny','Take care of children after school',58,27,900,'Childcare experience, safety training','jobs@safekids.com','2012-2121',1,24),(43,'Legal Compliance Officer','Ensure regulatory compliance in contracts',6,16,1650,'Paralegal cert, corporate law','info@legaltrust.com','2990-1122',1,15),(44,'Tour Guide','Lead local tourist groups',45,30,1100,'English, charisma, historical knowledge','careers@soltropical.com','2999-4455',1,15),(45,'Vehicle Mechanic','Maintain fleet vehicles',55,21,1350,'Engine repair, diagnostics tools','jobs@autopulse.com','2144-5678',1,24),(46,'Aerospace Engineer','Design aircraft prototypes',54,13,2600,'CAD, aerodynamics, R&D background','support@aerodyn.com','2345-6789',1,15),(47,'Environmental Scientist','Monitor pollution and advise policies',51,8,1800,'Field research, data analysis','eco@greenworld.com','2999-1234',1,15),(48,'E-commerce Specialist','Manage online store products and sales',57,18,1300,'WooCommerce, Shopify, marketing','jobs@foodiesunited.com','2567-1234',1,24),(49,'Customer Service Agent','Respond to client inquiries via phone/email',4,29,950,'CRM tools, problem-solving','hr@courierexpress.com','2777-0011',2,15),(50,'Delivery Driver','Deliver packages locally',41,29,1100,'Driver license, GPS use','hr@courierexpress.com','2777-0011',2,15),(51,'Bank Teller','Assist clients with transactions and accounts',46,5,1300,'Cash handling, customer service','jobs@fintechglobal.com','2666-7788',1,15);

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `description` varchar(75) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `role` */

insert  into `role`(`id`,`name`,`description`) values (1,'admin','Administrators from the employments app'),(2,'job seeker','Looking for jobs'),(3,'recruiter','For job posting and job seeker evaluation');

/*Table structure for table `status` */

DROP TABLE IF EXISTS `status`;

CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `status` */

insert  into `status`(`id`,`name`,`description`) values (1,'Requested','Job application Requested'),(2,'In Progress','Candidate being evaluated'),(3,'Hired','Candidate has been accepted'),(4,'Rejected','Candidate was rejected from open position'),(5,'Resume Pending','Candidate didnt upload his/her resume yet');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `role_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `resume_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ROLE_FK` (`role_id`),
  CONSTRAINT `ROLE_FK` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `user` */

insert  into `user`(`id`,`first_name`,`last_name`,`role_id`,`email`,`password`,`resume_url`) values (1,'Alexis','Reyes',1,'alexis@icloud.com','$2b$10$rJ9AV5RA/iKyWYF.37uSDu3IdP99ibrImMg0jAS9RbdRkTdMwZ0dW',''),(15,'Hector','Salamanca',3,'hectorsalamanca@breakingbad.com','$2b$10$QWSXmLhNVsH4VH1bPM1Zq.opycD43qu4MFwZJ9wm/etoAskrqYf8m',''),(24,'Grand','Elf',3,'gandalf@lor.com','$2b$10$Zo7nAl0zCk0fTMk9e9IBre7j9dqsO2tbJCnakuzqlBnkETloBGAR.',''),(39,'Donald','Trump',2,'realdonaldtrump@whitehouse.com','$2b$10$i.m6QE805MggMvoyKHvzRuDcv2vgbkPDpADiUSgRnGXciidTTZGFC','');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

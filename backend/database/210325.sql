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
  `active` tinyint(1) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `companies` */

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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `job_application` */

/*Table structure for table `job_application_history` */

DROP TABLE IF EXISTS `job_application_history`;

CREATE TABLE `job_application_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_app_id` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `updated_at` datetime NOT NULL,
  `comment` varchar(100) NOT NULL,
  `updated_status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `JOBAPP_FK` (`job_app_id`),
  KEY `UPDATEDBY_FK` (`updated_by`),
  KEY `STATUS_FK` (`updated_status`),
  CONSTRAINT `JOBAPP_FK` FOREIGN KEY (`job_app_id`) REFERENCES `job_application` (`id`),
  CONSTRAINT `STATUS_FK` FOREIGN KEY (`updated_status`) REFERENCES `status` (`id`),
  CONSTRAINT `UPDATEDBY_FK` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `job_application_history` */

/*Table structure for table `job_categories` */

DROP TABLE IF EXISTS `job_categories`;

CREATE TABLE `job_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `job_categories` */

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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `jobs` */

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `role` */

insert  into `role`(`id`,`name`) values (1,'admin'),(2,'job seeker'),(3,'recruiter');

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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `user` */

insert  into `user`(`id`,`first_name`,`last_name`,`role_id`,`email`,`password`,`resume_url`) values (1,'Marlon','Manzano',1,'malexismreyes@gmail.com','$2b$10$rJ9AV5RA/iKyWYF.37uSDu3IdP99ibrImMg0jAS9RbdRkTdMwZ0dW',NULL),(9,'Carlos','Landaverde Castro',2,'carlanda@gmail.com','$2b$10$p2AuJlQTIvbl3Ra0bOM5re0PyNlsRYfWTCDtmndSOaiyRLJA1KwKK','http://localhost:4000/uploads/resumes/1742591209812-Resume_MarlonManzano.pdf'),(11,'Marco Gonzalo ','Aguinaga Mancia',2,'gonzalo@gmail.com','$2b$10$e2kdlWiWulQ.qZUV91Z9DuLK2jDh7cCrEVpvcsh3uzjTLAPfkL6Gy',NULL),(15,'Hector','Salamanca',3,'hector@outsourcing.com','$2b$10$QWSXmLhNVsH4VH1bPM1Zq.opycD43qu4MFwZJ9wm/etoAskrqYf8m',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

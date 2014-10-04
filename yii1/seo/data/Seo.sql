
CREATE TABLE IF NOT EXISTS `tbl_seo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(2255) NOT NULL,
  `keywords` text NOT NULL,
  `description` text NOT NULL,
  `route` varchar(255) NOT NULL,
  `reserved` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0 ;

-- --------------------------------------------------------
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 11, 2023 at 08:01 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movieapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'admin@admin.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `booking_details`
--

CREATE TABLE `booking_details` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `movie_id` int(255) NOT NULL,
  `seat` varchar(255) NOT NULL,
  `total_cost` int(255) NOT NULL,
  `bookingDateTime` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(255) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `type`) VALUES
(1, 'nowshowing'),
(2, 'nextrelease'),
(3, 'commingsoon');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(255) NOT NULL,
  `movie_name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `movie_description` varchar(500) NOT NULL,
  `category_id` int(255) NOT NULL,
  `showtime_id` int(11) DEFAULT NULL,
  `embedded_links` varchar(2000) NOT NULL,
  `cover_image` varchar(255) NOT NULL,
  `movie_length` varchar(255) NOT NULL,
  `releasing_on` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `movie_name`, `slug`, `movie_description`, `category_id`, `showtime_id`, `embedded_links`, `cover_image`, `movie_length`, `releasing_on`) VALUES
(23, 'Animal', 'animal', 'A son\'s obsessive love for his father. Often away due to work the father is unable to comprehend the intensity of his son\'s love. Ironically, this fervent love and admiration for his father and family creates conflict between the father and son.', 1, NULL, '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Dydmpfo68DA?si=5o_aEuIIYBCEi9sg\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQxk9rkmGc2FQDNu5nyz0wtUKuEc6VNUoga2usbl1ziXrW26f_R', '204 Min', '2023-12-11'),
(24, 'Salaar: Part 1 – Ceasefire', 'salaar-part-1--ceasefire', 'Salaar: Part 1 – Ceasefire is an upcoming Indian Telugu-language epic action thriller film directed by Prashanth Neel and produced by Vijay Kiragandur.', 2, NULL, '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/HihakYi5M2I?si=FskrGx-srQ6ebY-j\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQs0lsPPE6Bz2_YrhtcpniobzbXmNoxplVP1wKR_nEBCugHzfdV', '205 Min', '2023-12-21'),
(25, 'Harry Potter | To Build A Home', 'harry-potter--to-build-a-home', 'Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry', 3, NULL, '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/oI7LnpEcrl0?si=h-MyzXRNR0c4X41J\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4rxIDrXXAxGWNie12v7AGiwNggXbOIZLeQ&usqp=CAU', '200 Min', '2023-12-27'),
(26, 'Dui Kadam', 'dui-kadam', 'The shooting of the new film \'Dui Kadam\' is going on in Mustang. The shooting of the film started five days ago. Uday Subba is directing the film. The film is based on the story of Dayaram Ghimire.\n\n', 1, NULL, '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/KtgKkBR-5P0?si=vfwO99DyCUS3TK0I\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>', 'https://bigmovies.com.np/Modules/CineUploadFiles/Movie/image/poster_112116_847365.jpeg', '190 Min', '2023-12-13'),
(27, 'Dunki', 'dunki', 'Dunki is an upcoming Indian Hindi-language comedy-drama film based on \"donkey flights\", an illegal immigration entry technique. The film is directed and edited by Rajkumar Hirani and produced under the banner of Red Chillies Entertainment and Jio Studios. It stars Shah Rukh Khan, Taapsee Pannu, Vicky Kaushal (billed as a special appearance), and Boman Irani.[2]', 2, NULL, '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Kp95Wat3YsA?si=vRYQXfiNW-mCFsHM\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Dunki_poster.jpg/220px-Dunki_poster.jpg', '204 Min', '2023-12-13');

-- --------------------------------------------------------

--
-- Table structure for table `showtime`
--

CREATE TABLE `showtime` (
  `id` int(255) NOT NULL,
  `timetoshow` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `showtime`
--

INSERT INTO `showtime` (`id`, `timetoshow`) VALUES
(1, '8:00 AM'),
(2, '11:45'),
(3, '03:30 PM'),
(4, '07:15 PM');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `image`, `password`) VALUES
(1, 'kumar', 'ram@gmail.com', 'adfasfdasdf.jpg', '$2b$10$kgjpRqBoR5QNYe0GRxumk.1I4mm.eThA5Tss3G46vajg1UPVWnONe'),
(3, 'kumar', 'raxzm@gmail.com', NULL, '$2b$10$QQhkgtjJPlirKKI1Cj.z1ecFOe2Injv335jFpxAuaBZps5xr8FI0i'),
(4, 'add', 'asdcasdc', NULL, '$2b$10$xf.NLCekyd.i8ZCZNIFKa.saNH3hY.Z7gXWhPFJ827DIFCXSWgiVq'),
(5, 'avas', 'kjkhfkja@gmail.com', NULL, '$2b$10$XiFa8vWMt3AV6Z/I5Qp1t.xTuAItJ88AyJoswTUIC2KUwbghTmQ8K'),
(8, 'sadf', 'anver', NULL, '$2b$10$dlKHzJPTOvvzMTBAgXxAquj0JdHKCwpB4JJ27Yk9EwVusGcgdqwHO'),
(13, 'roshan', 'roshan@gmail.com', NULL, '$2b$10$N7SAIoZS7FEE/NYStiIlquTv8Tn8Ff36ro/CvY3ANqDw0I4mJUGDW'),
(14, 'kabin', 'kabin@gmail.com', NULL, '$2b$10$FJ7NElpu9wIiTtfMljYLb./u11r/bc66z2U361SV3B8jOKkYv6kSS');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_details`
--
ALTER TABLE `booking_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `showtime_id` (`showtime_id`);

--
-- Indexes for table `showtime`
--
ALTER TABLE `showtime`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `booking_details`
--
ALTER TABLE `booking_details`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `showtime`
--
ALTER TABLE `showtime`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking_details`
--
ALTER TABLE `booking_details`
  ADD CONSTRAINT `booking_details_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_details_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movies_ibfk_2` FOREIGN KEY (`showtime_id`) REFERENCES `showtime` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

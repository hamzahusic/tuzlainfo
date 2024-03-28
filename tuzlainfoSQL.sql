-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: tuzlainfo
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `kategorija`
--

DROP TABLE IF EXISTS `kategorija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategorija` (
  `idKategorija` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(45) NOT NULL,
  `datum_dodavanja` date NOT NULL,
  PRIMARY KEY (`idKategorija`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategorija`
--

LOCK TABLES `kategorija` WRITE;
/*!40000 ALTER TABLE `kategorija` DISABLE KEYS */;
INSERT INTO `kategorija` VALUES (6,'sport','2024-03-21'),(7,'kultura','2024-03-21'),(8,'politika','2024-03-21'),(9,'događaj','2024-03-21'),(10,'crna hronika','2024-03-21');
/*!40000 ALTER TABLE `kategorija` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnik`
--

DROP TABLE IF EXISTS `korisnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnik` (
  `idKorisnik` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(45) NOT NULL,
  `prezime` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `sifra` varchar(300) NOT NULL,
  `uloga_iduloga` int NOT NULL,
  PRIMARY KEY (`idKorisnik`,`uloga_iduloga`),
  KEY `fk_korisnik_uloga1_idx` (`uloga_iduloga`),
  CONSTRAINT `fk_korisnik_uloga1` FOREIGN KEY (`uloga_iduloga`) REFERENCES `uloga` (`iduloga`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik`
--

LOCK TABLES `korisnik` WRITE;
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` VALUES (2,'Alen','Demirovic','alen@gmail.com','$2b$10$CS4syN/VqUQaTH/Bi9YTc.fyQqdmAp1D/1Kp84IPzjDoD.tfe1p3i',1),(6,'Mujo','Mujic','mujomujic@gmail.com','$2b$10$eC./wn.z/5QtCLJb6AeMrOmu8lmwga74J63QKY.T52CyZrsFXP4AS',2);
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objava`
--

DROP TABLE IF EXISTS `objava`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objava` (
  `idObjava` int NOT NULL AUTO_INCREMENT,
  `naslov` varchar(200) NOT NULL,
  `sadrzaj` text NOT NULL,
  `datum_objave` datetime NOT NULL,
  `korisnik_idKorisnik` int NOT NULL,
  `putanja_slike` varchar(100) NOT NULL,
  `kategorija_idKategorija` int NOT NULL,
  PRIMARY KEY (`idObjava`,`korisnik_idKorisnik`,`kategorija_idKategorija`),
  KEY `fk_objava_korisnik_idx` (`korisnik_idKorisnik`),
  KEY `fk_objava_kategorija1_idx` (`kategorija_idKategorija`),
  CONSTRAINT `fk_objava_kategorija1` FOREIGN KEY (`kategorija_idKategorija`) REFERENCES `kategorija` (`idKategorija`),
  CONSTRAINT `fk_objava_korisnik` FOREIGN KEY (`korisnik_idKorisnik`) REFERENCES `korisnik` (`idKorisnik`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objava`
--

LOCK TABLES `objava` WRITE;
/*!40000 ALTER TABLE `objava` DISABLE KEYS */;
INSERT INTO `objava` VALUES (10,'Automobil koji će vas oduševiti!','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum','2024-03-26 23:53:48',2,'1711305836992porsche-singer-vehicle-design-dls-kq-2048x1152.jpg',9),(11,'Vodič za pokretanje bloga u 2024. godini - Saveti za blogere','Ako želite da se upustite u blogovanje, ali se pitate šta je sve potrebno da obavite pre pokretanja bloga, imam dobre vesti – moći ćete! Potrebna su vam samo prava uputstva kako ne biste napravili neki od najčešćih početničkih propusta. Zbog toga sam napisala detaljan vodič za pokretanje bloga, sa svim koracima koje je potrebno da napravite.\r\n\r\nEvo deset koraka za pokretanje vašeg bloga:\r\n\r\nOpredelite se za nišu: Iako možete pisati o različitim temama, fokusiranje na specifičnu nišu je ključno. Razmislite o čemu želite da pišete i kome je ta tema namenjena. Niša može biti bilo šta – od putovanja i kulinarstva do tehnologije ili ličnog razvoja1.\r\nIzaberite ime za blog: Odaberite nešto opisno i lako pamtljivo. Ime treba da odražava sadržaj i stil vašeg bloga.\r\nNabavite domen i hosting: Registrirajte domen (ime vašeg bloga) i izaberite hosting provajdera. Hosting je mesto gde će se čuvati svi vaši fajlovi i gde će vaš blog biti dostupan na internetu.\r\nPrilagodite izgled bloga: Izaberite besplatni predložak (temu) za vaš blog i prilagodite ga svojim potrebama. Dodajte logo i druge elemente koji će ga učiniti prepoznatljivim.\r\nNapišite i objavite prvi post: Počnite sa pisanjem! Vaš prvi post može biti uvod u temu kojom ćete se baviti na blogu. Budite autentični i pišite iz lične perspektive.\r\nPromovišite svoj blog: Delite svoje postove na društvenim mrežama, komentarišite na drugim blogovima i gradite svoju čitalačku zajednicu.\r\nRazvijajte svoj sadržaj: Redovno pišite nove postove, istražujte teme i unapređujte svoj blog. Slušajte povratne informacije čitalaca i prilagodite se njihovim potrebama.\r\nMonetizujte svoj blog: Kada steknete određenu publiku, razmislite o načinima kako da zaradite putem bloga. To može biti kroz oglašavanje, affiliate marketing, prodaju proizvoda ili usluga, ili čak kreiranje sopstvenih digitalnih proizvoda.\r\nBudite dosledni i strpljivi: Blogovanje zahteva vreme i trud. Budite dosledni u objavljivanju i strpljivo gradite svoj blog.\r\nUčite i razvijajte se: Pratite trendove, učite nove veštine i budite otvoreni za promene. Blogovanje je dinamično i uvek ima prostora za napredak.\r\nSrećno sa vašim blogom! ','2024-03-26 20:25:37',2,'1711313760267pexels-pixabay-262508.jpg',7),(12,'Tehnologija u našem svakodnevnom životu: Prijatelj ili neprijatelj?','U današnjem modernom svijetu, tehnologija je postala neizostavan dio našeg svakodnevnog života. Od pametnih telefona do pametnih kuća, tehnološki napredak prožima svaku aspekt našeg postojanja. Dok neki slave ovaj proboj kao korak naprijed u evoluciji, drugi se pitaju da li smo postali robovi tehnologije, izgubljeni u moru digitalnih distrakcija. Sada je vrijeme da razmotrimo kako tehnologija oblikuje naš život i našu budućnost.\r\n\r\nJedan od najvidljivijih aspekata tehnološkog napretka je pametni telefon. Ovi uređaji su postali naši osobni asistenti, omogućavajući nam da ostanemo povezani s ljudima širom svijeta, pristupamo informacijama u trenutku, i čak upravljamo drugim uređajima u našem domu. Međutim, s porastom pametnih telefona dolazi i zabrinutost zbog prekomjerne upotrebe i ovisnosti. Mnogi se pitaju da li smo postali preokupirani virtualnim svijetom, zanemarujući stvarne veze i iskustva.\r\n\r\nPored pametnih telefona, tehnološki napredak je doveo do pojave pametnih kuća. Sada možemo kontrolirati osvjetljenje, termostat, sigurnosne kamere i još mnogo toga putem naših pametnih uređaja. Ova praktičnost je neosporiva, ali postavlja se pitanje koliko smo ranjivi prema hakerskim napadima i kršenju privatnosti kada povežemo svoj dom s internetom.\r\n\r\nMeđutim, tehnologija nije samo potencijalna prijetnja. Ona također donosi nevjerojatne mogućnosti za napredak u medicini, obrazovanju, i zaštiti okoliša. Primjena veštačke inteligencije u dijagnostici bolesti, učenju putem interneta, i razvoju održivih tehnologija su samo neki od primjera kako tehnologija može unaprijediti ljudski život.\r\n\r\nDakle, da li je tehnologija naš prijatelj ili neprijatelj? Odgovor nije crno-bijel. Umjesto toga, važno je da budemo svjesni kako koristimo tehnologiju i da se pobrinemo da je ona služi našim potrebama, a ne da postanemo njeni robovi. Treba težiti ravnoteži između iskorištavanja pogodnosti koje tehnologija pruža i očuvanja našeg fizičkog i mentalnog zdravlja.\r\n\r\nNa kraju, tehnologija je alat koji može oblikovati našu budućnost. Kako je koristimo određuje da li će biti naš najbolji prijatelj ili naš najveći neprijatelj. Stoga, budimo mudri u našem korištenju tehnologije i koristimo je za stvaranje boljeg i održivijeg svijeta za sve nas.\r\n\r\n','2024-03-24 00:00:00',2,'1711314138728pexels-xxss-is-back-777001.jpg',7),(13,'Politika u 21. stoljeću: Izazovi i Mogućnosti','Politika je oduvijek bila neizostavan dio ljudskog društva, ali u 21. stoljeću susrećemo se s novim i složenijim izazovima nego ikad prije. S društvenim mrežama, globalizacijom i rastućim ekonomskim nejednakostima, politički pejzaž doživljava duboke promjene koje zahtijevaju inovativne pristupe i odgovore.\r\n\r\nJedan od ključnih aspekata suvremene politike je sveprisutnost društvenih mreža. Dok su one pružile platformu za slobodnu razmjenu ideja i mobilizaciju masa, istovremeno su postale teren za širenje lažnih vijesti, dezinformacija i polarizacije. Ovaj fenomen stavlja izazov pred tradicionalne političke strukture, zahtijevajući prilagodbu na novi način komunikacije i angažmana s javnošću.\r\n\r\nGlobalizacija također mijenja način na koji politika funkcionira. S globalnom ekonomijom, migracijama i međunarodnim sporazumima, političari se suočavaju s potrebom za međunarodnom suradnjom više nego ikad prije. No istovremeno, raste i nacionalistički pokret koji stavlja naglasak na domaću politiku i suverenitet, stvarajući tenzije između lokalnih i globalnih interesa.\r\n\r\nEkonomska nejednakost postala je jedno od glavnih političkih pitanja 21. stoljeća. Rastući jaz između bogatih i siromašnih stvara napetosti u društvu i potiče traženje alternativnih političkih rješenja. Pitanja kao što su progresivno oporezivanje, minimalne plaće i socijalna sigurnost postaju ključni fokusi političkih kampanja širom svijeta.\r\n\r\nUnatoč ovim izazovima, politika u 21. stoljeću također pruža brojne mogućnosti za promjenu i napredak. S razvojem tehnologije i inovacija, postoji potencijal za stvaranje transparentnijih i odgovornijih političkih sustava. Aktivizam građana i angažman mladih ljudi pokazuju da postoji volja za promjenama i da politički proces može biti inkluzivniji i reprezentativniji.\r\n\r\nU konačnici, politika ostaje ključna sfera ljudskog djelovanja, ali se mijenja kako bi odgovorila izazovima suvremenog svijeta. Izazovi poput društvenih mreža, globalizacije i ekonomske nejednakosti zahtijevaju nove pristupe i rješenja, ali istovremeno pružaju mogućnosti za stvaranje boljeg i pravednijeg društva.','2024-03-26 20:26:22',2,'1711314296128pexels-wikimedia-commons-4666.jpg',8),(14,'Uloga sporta u današnjem društvu: Više od igre','Sport je više od samo igre, to je univerzalni jezik koji povezuje ljude širom svijeta. Od drevnih olimpijskih igara do suvremenih sportskih događaja, sport ima sposobnost da inspirira, motivira i ujedinjuje ljude na jedinstven način. U današnjem društvu, uloga sporta je višestruka i neizostavan je dio našeg života.\r\n\r\nJedna od ključnih uloga sporta je promicanje zdravog načina života i fizičke aktivnosti. Aktivno bavljenje sportom doprinosi poboljšanju tjelesnog zdravlja, jačanju mišića i kostiju, te smanjenju rizika od kroničnih bolesti poput dijabetesa i kardiovaskularnih problema. Osim toga, sport promiče timski rad, samodisciplinu i upornost, što su važne životne vještine.\r\n\r\nSport također ima moć da promijeni živote ljudi i zajednica. Kroz sportske programe i inicijative, mnoge organizacije rade na osnaživanju marginaliziranih grupa, poticanju inkluzije i socijalne promjene. Sport može pružiti nadu i inspiraciju mladima širom svijeta, otvarajući im put ka boljoj budućnosti.\r\n\r\nPored toga, sport ima ogroman ekonomski utjecaj. Sportski događaji kao što su Olimpijske igre, Svjetsko prvenstvo i Super Bowl privlače milijune gledatelja i generiraju ogromne prihode kroz televizijske prava, sponzorstva i prodaju ulaznica. Ova industrija stvara radna mjesta, potiče turizam i doprinosi gospodarskom razvoju.\r\n\r\nMeđutim, sport nije bez izazova. Problemi poput dopinga, korupcije i nasilja u sportu zahtijevaju pažljivu regulaciju i upravljanje. Također je važno osigurati da sport bude pristupačan svima, bez obzira na socioekonomski status, spol ili etničku pripadnost.\r\n\r\nU konačnici, sport ostaje važan dio našeg društva s bogatom poviješću i širokim utjecajem. Bez obzira da li se radi o profesionalnom natjecanju ili rekreativnom vježbanju, sport ima moć da inspirira ljude, poveže zajednice i promijeni svijet na bolje.','2024-03-26 22:17:17',2,'1711314386798pexels-pixabay-248547.jpg',6),(15,'Inovacija i inspiracija: Pregled konferencije \"FutureTech 2024\"','U proteklom vikendu, tehnološki entuzijasti, inovatori i poslovni lideri okupili su se na konferenciji \"FutureTech 2024\" kako bi istražili najnovije trendove i mogućnosti u tehnološkom sektoru. Ova dvodnevna konferencija održana je u srcu Silicijske doline, te je privukla pažnju široke publike zbog svoje reputacije kao epicentra inovacija.\r\n\r\nJedan od ključnih fokusa konferencije bio je razvoj veštačke inteligencije (AI) i njen uticaj na različite industrije. Govornici su istražili primjene AI u zdravstvu, obrazovanju, finansijama i drugim sektorima, ističući potencijalne prednosti i izazove koji proizilaze iz ove tehnologije. Paneli su se bavili pitanjima etike i regulacije u vezi sa AI, ističući važnost odgovornog razvoja i upotrebe ove moćne tehnologije.\r\n\r\nOsim toga, konferencija je predstavila najnovije dostignuće u oblasti blockchain tehnologije i digitalnih valuta. Raspravljalo se o tome kako ove tehnologije mijenjaju način na koji se vrše transakcije, skladišti podaci i provode poslovi širom svijeta. Paneli su istraživali potencijal blockchaina za rješavanje problema kao što su transparentnost, sigurnost podataka i uklanjanje posrednika u različitim industrijama.\r\n\r\nJedan od najinspirativnijih trenutaka konferencije bio je panel posvećen poduzetnicima i startapima. Mladi lideri podijelili su svoje priče o uspjehu, ističući izazove koje su preživjeli i lekcije koje su naučili na putu do uspjeha. Ovi motivirajući razgovori podsjetili su nas na važnost vizije, upornosti i inovacije u postizanju ciljeva.\r\n\r\nU konačnici, konferencija \"FutureTech 2024\" nije samo bila forum za razmjenu ideja i najnovijih tehnoloških dostignuća, već i inspirativno okupljanje koje je potaklo razmišljanje o budućnosti tehnologije i njenom uticaju na društvo. Sa nadahnutim idejama i novim kontaktima, učesnici su napustili konferenciju spremni da svoje vizije pretvore u stvarnost.\r\n\r\n','2024-03-24 21:49:53',2,'1711314461468pexels-johnmark-smith-301987.jpg',9),(16,'Spektakl na Zimskim Olimpijskim igrama 2024: Pregled najznačajnijih trenutaka','Zimski Olimpijski igre 2024. su nedavno završene, ostavljajući za sobom nezaboravne trenutke i inspirativne priče. Ovaj globalni sportski događaj okupio je najbolje sportaše iz cijelog svijeta, natječući se u različitim disciplinama na snijegu i ledu. Evo pregleda nekoliko najznačajnijih trenutaka sa ovih Olimpijskih igara:\r\n\r\n1. Otvorenje ceremonije: Spektakularna ceremonija otvaranja održana je u prekrasnom okruženju alpskih planina. Svečani defile sportaša, impresivni scenski prikazi i vatromet stvorili su nezaboravan doživljaj koji je obilježio početak ovog sportskog spektakla.\r\n\r\n2. Zlatni trenuci: Mnogi sportaši su se istakli svojim izvanrednim uspjesima, osvajajući zlato za svoje zemlje i postavljajući nove rekorde. Od brzog klizanja do alpskog skijanja, svaka disciplina je donijela svoje heroje i heroine koji su inspirirali gledatelje širom svijeta.\r\n\r\n3. Inspirativne priče o uspjehu: Osim sportskih dostignuća, Zimske Olimpijske igre su bile domaćin inspirativnim pričama o hrabrosti, upornosti i požrtvovnosti. Sportaši su se borili s ozljedama, nedaćama i nepovoljnim okolnostima, ali su pokazali nevjerojatan duh i volju da prevaziđu sve prepreke.\r\n\r\n4. Povezivanje kultura: Ove Olimpijske igre su ponudile priliku za povezivanje različitih kultura i naroda širom svijeta. Sportaši su se natjecali pod zastavama svojih zemalja, ali su također dijelili zajedničku strast prema sportu i poštovanje prema svojim suparnicima.\r\n\r\n5. Zatvaranje ceremonije: Završna ceremonija obilježila je kraj ovog spektakularnog događaja, ali i pozdravila svijet s nadom i optimizmom. Zajedno smo svjedočili nevjerojatnim sportskim dostignućima i podsjetili se moći sporta da nas ujedini i nadahne.\r\n\r\nZimske Olimpijske igre 2024. će ostati urezane u pamćenju kao jedan od najsjajnijih trenutaka u svjetskom sportu. Ovi događaji nisu samo pružili nezaboravne trenutke za sportaše i gledatelje, već su također promovirali vrijednosti kao što su fer igra, tolerancija i prijateljstvo među narodima.','2024-03-24 00:00:00',2,'1711314861950pexels-pixabay-262524.jpg',6),(17,'EU nezadovoljna nakon što je Schmidt nametnuo izmjene izbornog zakona','Evropska unija nije zadovoljna jer je visoki predstavnik za Bosnu i Hercegovinu Christian Schmidt bio primoran još jednom nametnuti izmjene Izbornog zakona u Bosni i Hercegovini, prenosi Klix.\r\n\r\nKako je saopćeno nakon današnjih odluka Schmidta, izvršne ovlasti visokog predstavnika treba koristiti “samo kao krajnju mjeru protiv nepopravljivih nezakonitih radnji.”\r\n\r\n“EU očekuje da vlasti Bosne i Hercegovine provedu potrebne reforme kako bi osigurale da se izbori provedu u skladu sa evropskim standardima primjenom OSCE/ODIHR-a i relevantnih preporuka Venecijanske komisije, te osiguraju transparentnost finansiranja političkih stranaka”, naveli su iz EU.\r\n\r\nPodsjećaju da su izrazili snažnu preferenciju da Parlament BiH preuzme odgovornost i usvoji ove reforme, “kao što su se lideri državne koalicije obavezali da će učiniti na vrijeme za implementaciju tokom oktobarskih općinskih izbora.”\r\n\r\n \r\n\r\nEU je naglasila da je “opsežna međunarodna supervizija nespojiva s evropskom budućnošću BiH i očekuje od svih aktera da se ponašaju odgovorno i pokažu suzdržanost u periodu koji je pred nama.”\r\n\r\n \r\n\r\n“Nakon odluke Evropskog vijeća da otvori pristupne pregovore, EU će nastaviti raditi s vlastima BiH na napredovanju na evropskom putu”, zaključili su na kraju.','2024-03-26 00:00:00',2,'1711491373656eu.jpg',8);
/*!40000 ALTER TABLE `objava` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uloga`
--

DROP TABLE IF EXISTS `uloga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uloga` (
  `iduloga` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(45) NOT NULL,
  PRIMARY KEY (`iduloga`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uloga`
--

LOCK TABLES `uloga` WRITE;
/*!40000 ALTER TABLE `uloga` DISABLE KEYS */;
INSERT INTO `uloga` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `uloga` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-27  1:33:54

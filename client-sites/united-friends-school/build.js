/* Static site builder for United Friends School (prototype).
   Assembles shared header/footer with per-page content into real .html pages. */
const fs = require("fs");
const path = require("path");
const OUT = __dirname;

const head = (title, desc) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Nunito:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/styles.css">
</head>
<body>`;

const header = () => `
<div class="util"><div class="wrap">
  <nav>
    <a href="community.html">Calendar &amp; Events</a>
    <a href="#">Careers</a>
    <a href="#">UFS Library</a>
    <a href="summer-camp.html">Summer Camp</a>
    <a href="#">Blog</a>
  </nav>
  <div class="social">
    <a href="tel:2155381733">215-538-1733</a>
    <a href="https://facebook.com/unitedfriendsschool" aria-label="Facebook" data-icon="facebook"></a>
    <a href="https://instagram.com/unitedfriendsschool" aria-label="Instagram" data-icon="instagram"></a>
    <a href="#" aria-label="YouTube" data-icon="youtube"></a>
  </div>
</div></div>

<div class="announce"><div class="wrap">
  <span data-icon="star" style="font-size:16px"></span>
  <span>UFS honored by PA Governor Josh Shapiro for our commitment to values-based education.</span>
  <a href="#">Read the letter</a>
</div></div>

<header class="nav" id="header"><div class="wrap">
  <a class="logo" href="index.html" aria-label="United Friends School home">
    <span class="logo-mark"></span>
    <span class="word"><b>United Friends</b><span>School</span></span>
  </a>
  <nav class="mainnav" id="mainnav">
    <div class="navitem has-sub">
      <a href="about.html">About</a>
      <div class="submenu">
        <a href="about.html#welcome">Welcome from Head of School</a>
        <a href="about.html#history">Our History</a>
        <a href="about.html#friends-education">Friends Education</a>
        <a href="about.html#leadership">Leadership &amp; Faculty</a>
        <a href="about.html#dei">Diversity, Equity &amp; Inclusion</a>
      </div>
    </div>
    <div class="navitem has-sub">
      <a href="programs.html">Programs</a>
      <div class="submenu">
        <a href="programs.html#toddler">Toddler Programs</a>
        <a href="programs.html#preschool">Preschool</a>
        <a href="programs.html#elementary">Elementary Education</a>
        <a href="programs.html#cocurricular">Co-Curricular Academics</a>
        <a href="programs.html#afterschool">After-School Program</a>
        <a href="programs.html#community-classes">Community Classes</a>
        <a href="summer-camp.html">Summer Camp</a>
      </div>
    </div>
    <div class="navitem has-sub">
      <a href="admissions.html">Admissions</a>
      <div class="submenu">
        <a href="admissions.html#apply">How to Apply</a>
        <a href="admissions.html#tuition">Tuition &amp; Fees</a>
        <a href="contact.html">Inquire</a>
        <a href="contact.html">Schedule a Visit</a>
        <a href="admissions.html#transportation">Transportation</a>
      </div>
    </div>
    <div class="navitem"><a href="community.html">Community</a></div>
    <div class="navitem"><a href="alumni.html">Alumni</a></div>
    <div class="navitem has-sub">
      <a href="support.html">Support</a>
      <div class="submenu">
        <a href="support.html#give">Give</a>
        <a href="support.html#eitc">PA Tax Credits</a>
      </div>
    </div>
    <a class="btn btn-gold mobile-cta" href="contact.html">Schedule a Tour</a>
  </nav>
  <div class="nav-cta">
    <a class="btn btn-gold" href="contact.html">Schedule a Tour</a>
    <button class="hamburger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</div></header>`;

const footer = () => `
<footer><div class="wrap">
  <div class="cols">
    <div>
      <div class="logo footer-logo"><span class="logo-mark"></span><span class="word"><b>United Friends</b><span style="color:var(--gold)">School</span></span></div>
      <p class="desc">An independent, progressive Quaker school nurturing curious, compassionate children for over 40 years.</p>
      <div class="foot-social">
        <a href="https://facebook.com/unitedfriendsschool" aria-label="Facebook" data-icon="facebook"></a>
        <a href="https://instagram.com/unitedfriendsschool" aria-label="Instagram" data-icon="instagram"></a>
        <a href="#" aria-label="YouTube" data-icon="youtube"></a>
      </div>
    </div>
    <div>
      <h4>Explore</h4>
      <a href="about.html">About Us</a>
      <a href="programs.html">Programs</a>
      <a href="about.html#friends-education">Quaker Life</a>
      <a href="summer-camp.html">Summer Camp</a>
      <a href="community.html">Community Life</a>
      <a href="alumni.html">Alumni</a>
    </div>
    <div>
      <h4>Admissions</h4>
      <a href="admissions.html#apply">How to Apply</a>
      <a href="admissions.html#tuition">Tuition &amp; Fees</a>
      <a href="contact.html">Inquire</a>
      <a href="contact.html">Schedule a Visit</a>
      <a href="support.html">Support UFS</a>
    </div>
    <div>
      <h4>Visit Us</h4>
      <a href="https://www.google.com/maps?q=1018+West+Broad+Street,+Quakertown,+PA+18951">1018 West Broad Street<br>Quakertown, PA 18951</a>
      <a href="tel:2155381733">215-538-1733</a>
      <a href="mailto:frontoffice@unitedfriendsschool.org">frontoffice@unitedfriendsschool.org</a>
    </div>
  </div>
  <div class="copyright">© 2026 United Friends School · Inspiring Curiosity, Cultivating Compassion, Nurturing Academics</div>
</div></footer>
<script src="assets/main.js"></script>
</body>
</html>`;

const banner = (crumb, title, sub) => `
<section class="page-banner"><div class="wrap">
  <nav class="crumb"><a href="index.html">Home</a> / <span>${crumb}</span></nav>
  <h1>${title}</h1>
  <p>${sub}</p>
</div></section>`;

const page = (file, title, desc, body) =>
  fs.writeFileSync(path.join(OUT, file), head(title, desc) + header() + body + footer());

/* ===================== HOME ===================== */
page("index.html",
  "United Friends School — Inspiring Curiosity, Cultivating Compassion, Nurturing Academics",
  "An independent, progressive Quaker school in Quakertown, PA serving children ages 1 through 5th grade. Outdoor learning, STEAM, and Quaker values for over 40 years.",
`
<section class="hero"><div class="wrap">
  <div>
    <span class="kicker">Welcome, friend</span>
    <h1>Inspiring Curiosity, Cultivating Compassion, <em>Nurturing Academics</em></h1>
    <p class="lead">An independent, progressive Quaker school in Quakertown, PA for children ages 1 through 5th grade.</p>
    <div class="actions">
      <a class="btn btn-gold" href="contact.html">Schedule a Tour <span class="arr" data-icon="check" style="display:none"></span></a>
      <a class="btn btn-outline" href="programs.html">Explore Our Programs</a>
    </div>
  </div>
  <div class="hero-art">
    <img class="photo" src="assets/hero.png" alt="Children exploring and learning outdoors at United Friends School">
    <div class="badge-niche"><span class="dot">N</span> Niche Best School 2025</div>
    <div class="badge-years"><b>40</b><span>Years</span></div>
    <div class="testimony">Rooted in Quaker testimonies &amp; the light within</div>
  </div>
</div></section>

<section class="trust"><div class="wrap">
  <div class="item"><span class="ic" data-icon="sunrise"></span><div><b>40+ Years</b><small>Nurturing exploration</small></div></div>
  <div class="item"><span class="ic" data-icon="child"></span><div><b>Ages 1&ndash;Grade 5</b><small>Toddler through elementary</small></div></div>
  <div class="item"><span class="ic" data-icon="leaf"></span><div><b>Quaker Values</b><small>Peace, equality, care for earth</small></div></div>
  <div class="item"><span class="ic" data-icon="award"></span><div><b>Niche Best 2025</b><small>Recognized for excellence</small></div></div>
</div></section>

<section class="sec light"><div class="wrap split">
  <div class="img-col reveal"><img src="assets/garden.jpg" alt="Children gardening together at UFS"></div>
  <div class="reveal">
    <span class="kicker">Who we are</span>
    <h2>We help children recognize the light within themselves and others.</h2>
    <p>United Friends School is an independent, progressive Quaker school that blends foundational academics with STEAM, outdoor education, creative arts, and collaborative, project-based learning. Rooted in the Quaker testimonies, we nurture curious, compassionate, confident children.</p>
    <p>Students of all faiths are welcome. Here, every child is known, valued, and free to wonder.</p>
    <div class="actions" style="margin-top:1.6rem">
      <a class="btn btn-navy" href="about.html">About United Friends</a>
      <a class="btn btn-outline" href="admissions.html">Begin Your Journey</a>
    </div>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head reveal">
    <span class="kicker">Programs for every age</span>
    <h2>A path that grows with your child</h2>
    <p>From first steps to fifth grade, our developmentally-rich programs meet children exactly where they are.</p>
  </div>
  <div class="cards3">
    <article class="pcard reveal"><img src="assets/toddler.jpg" alt="Toddlers playing"><div class="body">
      <span class="age">Ages 1&ndash;2</span><h3>Toddler &mdash; First Light</h3>
      <p>A gentle, sensory-rich first experience away from home, full of play, nature, and warmth.</p>
      <a class="more" href="programs.html#toddler">Learn more</a></div></article>
    <article class="pcard t2 reveal"><img src="assets/preschool.jpg" alt="Preschoolers doing arts and crafts"><div class="body">
      <span class="age">Ages 3&ndash;4</span><h3>Preschool &amp; Pre-K</h3>
      <p>Hands-on discovery, early literacy and numeracy, and big imaginations, guided with care.</p>
      <a class="more" href="programs.html#preschool">Learn more</a></div></article>
    <article class="pcard t3 reveal"><img src="assets/elementary.jpg" alt="Elementary children reading outdoors"><div class="body">
      <span class="age">TK&ndash;5th Grade</span><h3>Lower School</h3>
      <p>Project-based, interdisciplinary learning that builds critical thinkers and kind Upstanders.</p>
      <a class="more" href="programs.html#elementary">Learn more</a></div></article>
  </div>
  <div class="chips reveal">
    <a class="chip" href="summer-camp.html">Summer Camp</a>
    <a class="chip" href="programs.html#afterschool">After-School Program</a>
    <a class="chip" href="programs.html#cocurricular">Co-Curricular Academics</a>
    <a class="chip" href="programs.html#community-classes">Community Classes</a>
  </div>
</div></section>

<section class="sec values"><div class="wrap">
  <div class="sec-head reveal">
    <span class="kicker" style="color:var(--gold)">The Quaker difference</span>
    <h2>Six testimonies that shape every day</h2>
    <p>Our community is grounded in values children can feel and carry with them for life.</p>
  </div>
  <div class="vgrid">
    <div class="vcard reveal"><div class="ic" data-icon="peace"></div><h3>Peace &amp; Social Justice</h3><p>Non-violent conflict resolution and standing up for what is right.</p></div>
    <div class="vcard reveal"><div class="ic" data-icon="users"></div><h3>Community</h3><p>A close-knit circle of friends where every child belongs.</p></div>
    <div class="vcard reveal"><div class="ic" data-icon="scale"></div><h3>Equality</h3><p>The light of the spirit lives in every person, equally.</p></div>
    <div class="vcard reveal"><div class="ic" data-icon="globe"></div><h3>Care for the Earth</h3><p>Outdoor learning and stewardship woven through our curriculum.</p></div>
    <div class="vcard reveal"><div class="ic" data-icon="shield"></div><h3>Integrity</h3><p>Honesty, responsibility, and acting in line with our values.</p></div>
    <div class="vcard reveal"><div class="ic" data-icon="simplicity"></div><h3>Simplicity</h3><p>Focus on what truly matters: wonder, growth, and connection.</p></div>
  </div>
</div></section>

<section class="quote sec"><div class="wrap reveal">
  <span class="mark">&ldquo;</span>
  <blockquote>UFS gives our child individual attention, real critical thinking, and the Quaker values that build genuine confidence. We cannot imagine a more nurturing place to grow.</blockquote>
  <cite>A United Friends School Parent<span>Quakertown, PA</span></cite>
</div></section>

<section class="actionstrip"><div class="wrap">
  <a class="act" href="contact.html"><span class="ic" data-icon="mail"></span><span><b>Inquire</b><small>Request information</small></span></a>
  <a class="act" href="admissions.html#apply"><span class="ic" data-icon="edit"></span><span><b>Apply</b><small>Start your application</small></span></a>
  <a class="act" href="support.html"><span class="ic" data-icon="heart"></span><span><b>Give</b><small>Support UFS &amp; PA tax credits</small></span></a>
</div></section>

<section class="legacy reveal"><div class="wrap">
  <span class="kicker">A legacy of light</span>
  <h2>40 Years of Nurturing Exploration, Building Community, and Inspiring Learning</h2>
</div></section>

<section class="ctaband"><div class="wrap reveal">
  <h2>Come see the UFS difference</h2>
  <p>The best way to feel our community is to visit. Schedule a tour and meet the friends, teachers, and classrooms your child will love.</p>
  <a class="btn btn-gold" href="contact.html">Schedule a Tour</a>
</div></section>
`);

/* ===================== ABOUT ===================== */
page("about.html", "About Us — United Friends School",
  "Learn about United Friends School: our progressive Quaker mission, philosophy, history, leadership, and commitment to diversity, equity, and inclusion.",
banner("About Us", "About United Friends School", "An independent, progressive Quaker school where every child is known, valued, and free to wonder.") +
`
<section class="sec"><div class="wrap prose">
  <p class="lead-p">United Friends School is an independent progressive Quaker school using a blended approach of foundational skills, STEAM, outdoor education, creative arts, and collaborative projects to nurture the whole child.</p>

  <h2 id="welcome" class="anchor">Welcome from the Head of School</h2>
  <p>Welcome, friend. At UFS, belonging, warmth, and joy are at the heart of everything we do. We are a close-knit community where children are truly known, where curiosity is celebrated, and where each day brings new opportunities to explore, create, and grow together.</p>

  <h2>Our Mission</h2>
  <p>Rooted in the Quaker testimonies of Simplicity, Peace &amp; Social Justice, Integrity, Community, Equality, and Care for the Earth, United Friends School nurtures the intellectual, spiritual, and emotional growth of every child. We foster critical inquiry, solution-seeking, and social action, helping students become thoughtful, compassionate citizens of the world.</p>

  <h2>Our Philosophy</h2>
  <p>We hold the Quaker belief that there is a spirit of the divine in each person. This conviction is the foundation of our project-based, interdisciplinary, and developmentally appropriate curriculum. We design learning around children's interests, questions, and the real problems they care about, so that learning is meaningful, joyful, and lasting.</p>

  <h2 id="history" class="anchor">Our History</h2>
  <p>For more than 40 years, United Friends School has nurtured exploration, built community, and inspired learning in Quakertown, Pennsylvania. What began as a small Quaker school has grown into a vibrant community serving children from toddlerhood through fifth grade, while holding fast to the values that have always defined us.</p>

  <h2 id="friends-education" class="anchor">Friends Education &mdash; What is a Quaker School?</h2>
  <p>A Friends (Quaker) school is grounded in practices that build reflection, voice, and community. At UFS, these include:</p>
  <ul>
    <li><b>Meeting for Worship</b> &mdash; quiet, reflective gathering that builds stillness and self-awareness.</li>
    <li><b>Meeting for Announcements</b> &mdash; a shared community space for voice and connection.</li>
    <li><b>Service &amp; outreach</b> &mdash; learning to care for others and the wider world.</li>
    <li><b>Non-violent conflict resolution</b> &mdash; tools for empathy, listening, and peace.</li>
    <li><b>Consensus decision-making</b> &mdash; every voice matters in our community.</li>
  </ul>
  <p>We are proud to partner with local Friends Meetings &mdash; Unami, Richland, Gwynedd, and Doylestown &mdash; and we draw on the resources of the Philadelphia Yearly Meeting, the Friends Council on Education, and Friends Journal.</p>

  <h3>Progressive education &amp; "Upstanders"</h3>
  <p>UFS goes beyond mandated standards to design curriculum around student interest, problems, projects, and questions. We encourage every child to become an "Upstander" &mdash; a confident advocate for themselves, their community, and what is right.</p>
</div></section>

<section class="sec cream-bg" id="leadership"><div class="wrap">
  <div class="sec-head reveal"><span class="kicker">Our people</span><h2>Leadership &amp; Faculty</h2>
    <p>A dedicated team of educators who know every child by name.</p></div>
  <div class="staff">
    <div class="person reveal"><div class="av">HS</div><h4>Head of School</h4><div class="role">School Leadership</div><p>Guiding the UFS vision with warmth, experience, and a deep commitment to Quaker education.</p></div>
    <div class="person reveal"><div class="av">AW</div><h4>Amy Wall</h4><div class="role">Advancement Director</div><p>Connecting families and supporters with the mission and future of UFS.</p></div>
    <div class="person reveal"><div class="av">UFS</div><h4>Our Faculty</h4><div class="role">Teachers &amp; Specialists</div><p>Experienced, nurturing educators across toddler, preschool, and elementary programs.</p></div>
  </div>
</div></section>

<section class="sec" id="dei"><div class="wrap prose">
  <h2 class="anchor" style="margin-top:0">Diversity, Equity &amp; Inclusion</h2>
  <p>The Quaker testimony of Equality is central to who we are. We believe the light of the spirit lives in every person, and we are committed to building a community where children of all backgrounds, faiths, and abilities feel they belong. We weave respect, inclusion, and social justice into our daily life and curriculum.</p>
  <div class="actions" style="margin-top:1.4rem">
    <a class="btn btn-gold" href="contact.html">Schedule a Visit</a>
    <a class="btn btn-outline" href="admissions.html">Admissions</a>
  </div>
</div></section>
`);

/* ===================== PROGRAMS ===================== */
page("programs.html", "Programs — United Friends School",
  "Explore UFS programs: Toddler, Preschool & Pre-K, Elementary, Co-Curricular Academics, After-School, Community Classes, and Summer Camp.",
banner("Programs", "Our Programs", "Developmentally-rich programs for children ages 1 through 5th grade, rooted in play, nature, and purpose.") +
`
<section class="sec"><div class="wrap">
  <div class="prog" id="toddler">
    <div class="pimg reveal"><img src="assets/toddler.jpg" alt="Toddlers exploring"></div>
    <div class="reveal"><span class="age">Ages 1&ndash;2</span><h3>Toddler Programs &mdash; First Light</h3>
      <p>A warm, gentle first step away from home. Our toddler program is sensory-rich and play-based, with abundant time outdoors, nurturing caregivers, and flexible 2 to 5 day schedules that fit your family.</p>
      <ul class="feature-list">
        <li><span class="tick" data-icon="check"></span><span>Low ratios and loving, consistent caregivers</span></li>
        <li><span class="tick" data-icon="check"></span><span>Daily outdoor play and nature exploration</span></li>
        <li><span class="tick" data-icon="check"></span><span>Full-day and half-day options, with early &amp; after care</span></li>
      </ul>
    </div>
  </div>
  <div class="prog rev" id="preschool">
    <div class="pimg reveal"><img src="assets/preschool.jpg" alt="Preschoolers creating art"></div>
    <div class="reveal"><span class="age">Ages 3&ndash;4</span><h3>Preschool &amp; Pre-K</h3>
      <p>Curiosity takes flight. Through hands-on discovery, early literacy and numeracy, and imaginative play, our preschoolers build the social, emotional, and academic foundations for a lifelong love of learning.</p>
      <ul class="feature-list">
        <li><span class="tick" data-icon="check"></span><span>Play-based, developmentally appropriate curriculum</span></li>
        <li><span class="tick" data-icon="check"></span><span>STEAM, arts, and nature woven through every week</span></li>
        <li><span class="tick" data-icon="check"></span><span>Pre-K 3 and Pre-K options, half or full days</span></li>
      </ul>
    </div>
  </div>
  <div class="prog" id="elementary">
    <div class="pimg reveal"><img src="assets/elementary.jpg" alt="Elementary students reading"></div>
    <div class="reveal"><span class="age">TK&ndash;5th Grade</span><h3>Elementary Education &mdash; Lower School</h3>
      <p>Our project-based, interdisciplinary approach turns big questions into deep learning. Students build strong academic foundations alongside critical thinking, collaboration, and the confidence to become kind, capable Upstanders.</p>
      <ul class="feature-list">
        <li><span class="tick" data-icon="check"></span><span>Interdisciplinary, project-based curriculum</span></li>
        <li><span class="tick" data-icon="check"></span><span>Small classes where every child is known</span></li>
        <li><span class="tick" data-icon="check"></span><span>Outdoor education and real-world problem solving</span></li>
      </ul>
    </div>
  </div>
</div></section>

<section class="sec cream-bg"><div class="wrap">
  <div class="sec-head reveal"><span class="kicker">Beyond the classroom</span><h2>More ways to learn &amp; grow</h2></div>
  <div class="cards3">
    <article class="pcard reveal" id="cocurricular"><div class="body anchor"><span class="age">Enrichment</span><h3>Co-Curricular Academics</h3><p>Music, art, movement, and special projects that round out a joyful, well-balanced education.</p></div></article>
    <article class="pcard t2 reveal" id="afterschool"><div class="body anchor"><span class="age">After 3pm</span><h3>After-School Program</h3><p>A safe, enriching extension of the day with play, homework support, and time outdoors.</p></div></article>
    <article class="pcard t3 reveal" id="community-classes"><div class="body anchor"><span class="age">For families</span><h3>Community Classes</h3><p>Enrichment classes and gatherings that welcome our wider community onto campus.</p></div></article>
  </div>
  <div class="center" style="margin-top:40px">
    <a class="btn btn-navy" href="summer-camp.html">Discover Summer Camp</a>
  </div>
</div></section>

<section class="ctaband"><div class="wrap reveal">
  <h2>See our classrooms in action</h2>
  <p>Schedule a tour to meet our teachers and watch hands-on, joyful learning come to life.</p>
  <a class="btn btn-gold" href="contact.html">Schedule a Tour</a>
</div></section>
`);

/* ===================== ADMISSIONS ===================== */
page("admissions.html", "Admissions & Tuition — United Friends School",
  "How to apply to United Friends School, 2026-2027 tuition and fees, financial aid through FACTS, transportation, and admissions FAQs.",
banner("Admissions", "Admissions", "A community built on collaboration, respect, and a love of learning. We welcome families year-round through rolling admissions.") +
`
<section class="sec"><div class="wrap split">
  <div class="reveal">
    <span class="kicker" id="apply">How to apply</span>
    <h2>Joining our community</h2>
    <p>We welcome families of all faiths and backgrounds. Spaces are limited and offered on a rolling basis, so we encourage you to begin early.</p>
    <ul class="feature-list">
      <li><span class="tick" data-icon="check"></span><span><b>Inquire</b> &mdash; tell us about your family and child.</span></li>
      <li><span class="tick" data-icon="check"></span><span><b>Schedule a visit</b> &mdash; tour the school and meet our team.</span></li>
      <li><span class="tick" data-icon="check"></span><span><b>Apply</b> &mdash; submit your application (rolling admissions).</span></li>
      <li><span class="tick" data-icon="check"></span><span><b>Student visit</b> &mdash; a gentle assessment to ensure a great fit.</span></li>
      <li><span class="tick" data-icon="check"></span><span><b>Enroll</b> &mdash; welcome to the UFS family!</span></li>
    </ul>
    <div class="actions" style="margin-top:1.4rem">
      <a class="btn btn-gold" href="contact.html">Schedule a Visit</a>
      <a class="btn btn-outline" href="contact.html">Inquire Now</a>
    </div>
  </div>
  <div class="reveal"><img src="assets/garden.jpg" alt="Children at UFS" style="border-radius:22px;box-shadow:var(--shadow);aspect-ratio:5/4;object-fit:cover;width:100%"></div>
</div></section>

<section class="sec cream-bg" id="tuition"><div class="wrap">
  <div class="sec-head reveal anchor"><span class="kicker">2026&ndash;2027</span><h2>Tuition &amp; Fees</h2>
    <p>Flexible schedules to fit your family. Need-based financial aid is available.</p></div>

  <div class="table-wrap reveal">
    <table class="ptable"><caption>First Light &mdash; Toddler (Ages 1&ndash;2)</caption>
      <thead><tr><th>Schedule</th><th>Hours</th><th>Tuition</th></tr></thead>
      <tbody>
        <tr><td>5 Full Days</td><td>8am&ndash;3pm</td><td>$1,350 / mo</td></tr>
        <tr><td>5 Half Days</td><td>8am&ndash;1pm</td><td>$1,100 / mo</td></tr>
        <tr><td>3 Full Days</td><td>8am&ndash;3pm</td><td>$1,000 / mo</td></tr>
        <tr><td>2 Full Days</td><td>8am&ndash;3pm</td><td>$600 / mo</td></tr>
        <tr><td>Early Care add-on</td><td>7am&ndash;8am</td><td>$95&ndash;$220 / mo</td></tr>
        <tr><td>After Care add-on</td><td>3pm&ndash;5:30pm</td><td>$235&ndash;$550 / mo</td></tr>
      </tbody>
    </table>
  </div>

  <div class="table-wrap reveal">
    <table class="ptable"><caption>Preschool &amp; Pre-K (Ages 3&ndash;4)</caption>
      <thead><tr><th>Program</th><th>Per year</th><th>Per month</th></tr></thead>
      <tbody>
        <tr><td>Pre-K, 3 Half Days</td><td>$7,350 / yr</td><td>$735 / mo</td></tr>
        <tr><td>Pre-K, 5 Half Days</td><td>$12,320 / yr</td><td>$1,232 / mo</td></tr>
        <tr><td>Pre-K, 5 Full Days</td><td>$16,015 / yr</td><td>$1,601.50 / mo</td></tr>
      </tbody>
    </table>
  </div>

  <div class="table-wrap reveal">
    <table class="ptable"><caption>Elementary (TK&ndash;5th Grade)</caption>
      <thead><tr><th>Program</th><th>Per year</th><th>Per month</th></tr></thead>
      <tbody><tr><td>Elementary, Full Time</td><td>$19,820 / yr</td><td>$1,982 / mo</td></tr></tbody>
    </table>
  </div>

  <div class="prose reveal" style="margin-top:1rem">
    <h3>Financial Aid</h3>
    <p>UFS offers need-based financial aid through the FACTS Grant &amp; Aid Assessment. Families reapply each year, and aid decisions are made separately from admissions decisions. We encourage any family who needs support to apply &mdash; cost should never stand between a child and the right school.</p>
  </div>
</div></section>

<section class="sec" id="transportation"><div class="wrap split rev">
  <div class="img-col reveal"><img src="assets/hero.png" alt="UFS campus"></div>
  <div class="reveal anchor">
    <span class="kicker">Getting here</span>
    <h2>Transportation</h2>
    <p>United Friends School is conveniently located at 1018 West Broad Street in Quakertown, PA. Families travel from across the region; reach out to learn about carpooling and transportation options that may be available for your area.</p>
    <div class="info-line"><span class="ic" data-icon="pin"></span> 1018 West Broad Street, Quakertown, PA 18951</div>
    <div class="info-line"><span class="ic" data-icon="phone"></span> <a href="tel:2155381733">215-538-1733</a></div>
  </div>
</div></section>

<section class="sec cream-bg"><div class="wrap">
  <div class="sec-head reveal"><span class="kicker">Good to know</span><h2>Admissions FAQ</h2></div>
  <div class="faq reveal">
    <details><summary>What ages do you serve?<span class="pm">+</span></summary><div class="ans">We welcome children from age 1 (toddler) through 5th grade.</div></details>
    <details><summary>How do we begin?<span class="pm">+</span></summary><div class="ans">Start by inquiring and scheduling a visit. From there we will guide you through the application step by step.</div></details>
    <details><summary>When should we apply?<span class="pm">+</span></summary><div class="ans">We use rolling admissions, so you can apply any time. Because space is limited, earlier is better.</div></details>
    <details><summary>Is there a student assessment?<span class="pm">+</span></summary><div class="ans">Yes &mdash; a gentle, age-appropriate visit helps us ensure UFS is the right fit for your child.</div></details>
    <details><summary>Do you offer sibling preference?<span class="pm">+</span></summary><div class="ans">Yes, siblings of current UFS students receive admissions preference.</div></details>
    <details><summary>Do we need to be Quaker?<span class="pm">+</span></summary><div class="ans">Not at all. Families of all faiths and backgrounds are warmly welcome. All students take part in our Quaker practices, such as Meeting for Worship.</div></details>
  </div>
</div></section>

<section class="quote sec"><div class="wrap reveal">
  <span class="mark">&ldquo;</span>
  <blockquote>The quality of education, the emphasis on environmental responsibility and social justice, and the genuine respect for each child are why we chose UFS.</blockquote>
  <cite>Sara Dobson<span>UFS Parent</span></cite>
</div></section>
`);

/* ===================== SUMMER CAMP ===================== */
page("summer-camp.html", "Summer Camp — United Friends School",
  "UFS Summer Camp: a nature-centered, play-based summer for ages 4+. Seven themed weeks June through August, with flexible half- and full-day options.",
banner("Summer Camp", "Summer Camp at UFS", "A nature-centered, play-based summer for ages 4 and up. Outdoor adventure, imagination, and real friendships.") +
`
<section class="sec"><div class="wrap split">
  <div class="img-col reveal"><img src="assets/elementary.jpg" alt="Children at summer camp outdoors"></div>
  <div class="reveal">
    <span class="kicker">June &ndash; August</span>
    <h2>Summers full of wonder</h2>
    <p>UFS Summer Camp emphasizes outdoor time, imagination, and the Quaker values of kindness and cooperation. Weekly sessions run Monday through Friday, 9am to 1pm, with an optional 3pm pickup. Each themed week is thoughtfully designed around child-led exploration, cooperative play, and creative expression.</p>
    <div class="info-line"><span class="ic" data-icon="sun"></span> Ages 4+ &middot; Mon&ndash;Fri, 9am&ndash;1pm (optional 3pm pickup)</div>
    <div class="actions" style="margin-top:1.2rem"><a class="btn btn-gold" href="contact.html">Reserve a Week</a></div>
  </div>
</div></section>

<section class="sec cream-bg"><div class="wrap">
  <div class="sec-head reveal"><span class="kicker">Flexible options</span><h2>Weekly Tuition</h2></div>
  <div class="table-wrap reveal" style="max-width:680px;margin-inline:auto">
    <table class="ptable"><caption>Choose the rhythm that fits your summer</caption>
      <thead><tr><th>Option</th><th>Days</th><th>Tuition</th></tr></thead>
      <tbody>
        <tr><td>Half Day</td><td>5 Days</td><td>$285 / wk</td></tr>
        <tr><td>Half Day</td><td>3 Days (MWF)</td><td>$170 / wk</td></tr>
        <tr><td>Full Day</td><td>5 Days</td><td>$415 / wk</td></tr>
        <tr><td>Full Day</td><td>3 Days (MWF)</td><td>$250 / wk</td></tr>
      </tbody>
    </table>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head reveal"><span class="kicker">Seven themed weeks</span><h2>A new adventure every week</h2></div>
  <div class="weeks">
    <div class="week reveal"><div class="date">Week 1 &middot; Jun 15</div><h4>Bricks, Blocks &amp; Puzzles</h4><p>Building, engineering, and problem-solving through hands-on play.</p></div>
    <div class="week reveal"><div class="date">Week 2 &middot; Jun 22</div><h4>Thrive &amp; Survive: Outdoor Camp</h4><p>Nature skills, exploration, and outdoor adventure.</p></div>
    <div class="week reveal"><div class="date">Week 3 &middot; Jul 6</div><h4>Little Olympics</h4><p>Games, movement, and joyful friendly competition.</p></div>
    <div class="week reveal"><div class="date">Week 4 &middot; Jul 13</div><h4>The Show Must Go On!</h4><p>Theater, storytelling, and performance for every kind of star.</p></div>
    <div class="week reveal"><div class="date">Week 5 &middot; Jul 20</div><h4>Artists &amp; Bakers Extraordinaires</h4><p>Creating, decorating, and tasting our way through the week.</p></div>
    <div class="week reveal"><div class="date">Week 6 &middot; Jul 27</div><h4>Flipped Fairytales</h4><p>Reimagining beloved stories with imagination and humor.</p></div>
    <div class="week reveal"><div class="date">Week 7 &middot; Aug 3</div><h4>Sensory Lab</h4><p>Hands-on science and sensory exploration and discovery.</p></div>
    <div class="week reveal" style="background:var(--gold);border-color:var(--gold);display:grid;place-items:center;text-align:center">
      <a href="contact.html" style="font-family:'Fraunces';font-weight:700;color:var(--navy)">Reserve a Week</a>
    </div>
  </div>
</div></section>

<section class="ctaband"><div class="wrap reveal">
  <h2>Give your child an unforgettable summer</h2>
  <p>Weeks fill up quickly. Reach out to reserve your child's spot today.</p>
  <a class="btn btn-gold" href="contact.html">Reserve a Week</a>
</div></section>
`);

/* ===================== COMMUNITY ===================== */
page("community.html", "Community Life — United Friends School",
  "Community events at United Friends School: seasonal celebrations, Curriculum Night, our 5K & Fun Run, Chorus & Cocoa, and more. Open to the public.",
banner("Community Life", "Community Life", "Where friendships and families gather. Our events are open to the UFS community and the public throughout the year.") +
`
<section class="sec"><div class="wrap">
  <div class="events">
    <div class="ev reveal"><div class="ic" data-icon="tent"></div><h4>Spring Into Summer</h4><p>A seasonal celebration with a vendor market, games, and live music.</p></div>
    <div class="ev reveal"><div class="ic" data-icon="flask"></div><h4>Curriculum Night</h4><p>An open-house showcase of project-based learning. Our recent theme: the Human Body.</p></div>
    <div class="ev reveal"><div class="ic" data-icon="activity"></div><h4>5K &amp; Fun Run</h4><p>Our annual community run and fundraiser for friends of all ages.</p></div>
    <div class="ev reveal"><div class="ic" data-icon="music"></div><h4>Chorus &amp; Cocoa</h4><p>A cozy holiday concert with caf&eacute; food and the UFS Market.</p></div>
  </div>
  <div class="prose reveal" style="margin-top:54px">
    <h2 style="margin-top:0">A community that shows up for one another</h2>
    <p>From seasonal markets to concerts and fun runs, life at UFS extends well beyond the classroom. Our events bring together students, families, alumni, and neighbors &mdash; building the warm, connected community that defines a Friends school.</p>
    <p>Want to be the first to know about upcoming events? Reach out and we will keep you in the loop.</p>
    <div class="actions" style="margin-top:1.2rem">
      <a class="btn btn-gold" href="contact.html">Get Community Updates</a>
      <a class="btn btn-outline" href="alumni.html">Alumni</a>
    </div>
  </div>
</div></section>
`);

/* ===================== ALUMNI ===================== */
page("alumni.html", "Alumni — United Friends School",
  "Once a friend, always a friend. Stay connected with United Friends School: newsletter, visits, ways to give back, and sharing your story.",
banner("Alumni", "UFS Alumni", "Our connection does not end when you graduate &mdash; it grows.") +
`
<section class="sec"><div class="wrap">
  <div class="prose reveal" style="margin-bottom:40px">
    <p class="lead-p">Once a friend, always a friend. Wherever life takes you, you will always have a home at United Friends School. We love hearing where our graduates go and the light they carry into the world.</p>
  </div>
  <div class="cards3">
    <article class="pcard reveal"><div class="body"><span class="age" data-icon="mail" style="display:inline-flex"></span><h3>Stay in Touch</h3><p>Subscribe to our newsletter for UFS news, events, and alumni stories.</p><a class="more" href="contact.html">Subscribe</a></div></article>
    <article class="pcard t2 reveal"><div class="body"><span class="age">Visit</span><h3>Come Back &amp; Visit</h3><p>Schedule a visit to walk the halls and reconnect with your UFS community.</p><a class="more" href="contact.html">Schedule a Visit</a></div></article>
    <article class="pcard t3 reveal"><div class="body"><span class="age">Give Back</span><h3>Support UFS</h3><p>Help the next generation of friends thrive by giving back to the school you love.</p><a class="more" href="support.html">Support UFS</a></div></article>
  </div>
  <div class="center" style="margin-top:40px"><a class="btn btn-navy" href="contact.html">Connect &amp; Share Your Story</a></div>
</div></section>
`);

/* ===================== SUPPORT ===================== */
page("support.html", "Support UFS — United Friends School",
  "Support United Friends School through gifts, volunteering, and Pennsylvania EITC tax credits. Redirect your PA tax dollars to UFS.",
banner("Support UFS", "Support United Friends School", "Your generosity keeps the light within our community shining. There are many ways to give.") +
`
<section class="sec"><div class="wrap prose">
  <h2 id="give" class="anchor" style="margin-top:0">Ways to Give</h2>
  <p>There are many ways to contribute to UFS &mdash; each one makes a real difference for our students and teachers:</p>
  <ul>
    <li><b>Financial gifts</b> &mdash; one-time or recurring donations of any size.</li>
    <li><b>Scholarship fund</b> &mdash; help make a UFS education possible for more families.</li>
    <li><b>Volunteering</b> &mdash; share your time and talents with our community.</li>
    <li><b>Events</b> &mdash; join and support our seasonal gatherings and fundraisers.</li>
  </ul>
  <p>To give or learn more, contact <b>Amy Wall, Advancement Director</b>, at <a href="mailto:frontoffice@unitedfriendsschool.org">frontoffice@unitedfriendsschool.org</a> or <a href="tel:2155381733">215-538-1733</a>.</p>
</div></section>

<section class="sec cream-bg" id="eitc"><div class="wrap split">
  <div class="reveal anchor">
    <span class="kicker">For Pennsylvania taxpayers</span>
    <h2>PA Tax Credits (EITC)</h2>
    <p>The Educational Improvement Tax Credit (EITC) program lets Pennsylvania businesses and individuals redirect their state tax liability to support scholarships at UFS &mdash; often at little to no net cost to you.</p>
    <ul class="feature-list">
      <li><span class="tick" data-icon="check"></span><span>Direct your PA tax dollars to a school you believe in</span></li>
      <li><span class="tick" data-icon="check"></span><span>Receive up to 90% back as a tax credit</span></li>
      <li><span class="tick" data-icon="check"></span><span>Help fund scholarships for UFS families</span></li>
    </ul>
    <div class="actions" style="margin-top:1.2rem"><a class="btn btn-gold" href="contact.html">Learn About EITC</a></div>
  </div>
  <div class="reveal">
    <div class="tuition-card">
      <div class="top">A parent's perspective</div>
      <div style="padding:22px 24px;font-family:'Fraunces';font-style:italic;font-size:1.15rem;color:var(--navy);line-height:1.5">
        &ldquo;The EITC program allows me to control where my PA tax dollars go. I get 90% of the money back, which makes this a no-brainer.&rdquo;
      </div>
      <div class="foot">&mdash; A United Friends School parent</div>
    </div>
  </div>
</div></section>

<section class="ctaband"><div class="wrap reveal">
  <h2>Be part of the next 40 years</h2>
  <p>Every gift, hour, and tax credit helps UFS nurture curious, compassionate children for generations to come.</p>
  <a class="btn btn-gold" href="contact.html">Get in Touch</a>
</div></section>
`);

/* ===================== CONTACT ===================== */
page("contact.html", "Schedule a Tour — United Friends School",
  "Schedule a tour of United Friends School in Quakertown, PA. Tell us about your family and we will be in touch.",
banner("Schedule a Tour", "Schedule Your Tour", "The best way to feel the UFS difference is to visit. Tell us a little about your family and we will be in touch.") +
`
<section class="sec contact"><div class="wrap">
  <div class="contact-grid">
    <div class="reveal">
      <form data-demo>
        <div class="frow">
          <input name="first" placeholder="First name" required>
          <input name="last" placeholder="Last name" required>
        </div>
        <input name="email" type="email" placeholder="Email address" required>
        <input name="phone" type="tel" placeholder="Phone (optional)">
        <textarea name="message" rows="4" placeholder="Tell us about your child (age, what you are looking for)..."></textarea>
        <button class="btn btn-gold" type="submit" style="justify-content:center">Request My Tour</button>
        <div class="ok">Thank you! We have received your request and will reach out shortly.</div>
      </form>
      <div style="margin-top:1.6rem">
        <div class="info-line"><span class="ic" data-icon="pin"></span> 1018 West Broad Street, Quakertown, PA 18951</div>
        <div class="info-line"><span class="ic" data-icon="phone"></span> <a href="tel:2155381733">215-538-1733</a></div>
        <div class="info-line"><span class="ic" data-icon="mail"></span> <a href="mailto:frontoffice@unitedfriendsschool.org">frontoffice@unitedfriendsschool.org</a></div>
      </div>
    </div>
    <iframe class="map" title="UFS location" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps?q=1018+West+Broad+Street,+Quakertown,+PA+18951&output=embed"></iframe>
  </div>
</div></section>
`);

console.log("Built", fs.readdirSync(OUT).filter(f => f.endsWith(".html")).length, "pages.");

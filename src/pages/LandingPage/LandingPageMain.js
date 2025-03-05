import React from "react";
import './LandingPageStyles.css'
import logo from './../../assets/images/logo.png'
import logoDark from './../../assets/images/dark-logo.png'
import facebook from './../../assets/images/facebook.png'
import instagram from './../../assets/images/instagram.png'
import youtube from './../../assets/images/youtube.png'
import linkedin from './../../assets/images/linkedin.png'
import x from './../../assets/images/x.png'
import tiktok from './../../assets/images/tiktok.png'
import bannerVideo from './../../assets/images/banner-video.png'
import business1 from './../../assets/images/business1.png'
import business2 from './../../assets/images/business2.png'
import business3 from './../../assets/images/business3.png'
import autopilot1 from './../../assets/images/autopilot1.png'
import autopilot2 from './../../assets/images/autopilot2.png'
import autopilot3 from './../../assets/images/autopilot3.png'
import Joe from './../../assets/images/Joe.jpg'
import client2 from './../../assets/images/client2.jpg'
import client3 from './../../assets/images/client3.jpg'
import client4 from './../../assets/images/client4.jpg'
import client5 from './../../assets/images/client5.jpg'
import client6 from './../../assets/images/client6.jpg'
import client7 from './../../assets/images/client7.jpg'
import client8 from './../../assets/images/client8.jpg'
import VideoPopup from "./VideoPopup";
import { useNavigate } from "react-router-dom";

const LandingPageMain = () => {
    const navigate = useNavigate()
  return (
    <div>
      <header class="header_main">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="header">
                <div class="logo">
                  <a href="/">
                    <img src={logo} alt="" />
                  </a>
                  <div id="nav-icon4" class="menu_icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div class="menu">
                  <ul>
                    <li>
                      <a href="#">Features</a>
                    </li>
                    <li>
                      <a href="#">Reviews</a>
                    </li>
                    <li>
                      <a href="#">Pricing</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                  </ul>
                  <div class="header_btns header_btns_menu">
                    <a  class="btn_style" >
                      Login
                    </a>
                    <a  class="btn_style btn_style2">
                      Get Started
                    </a>
                  </div>
                </div>
                <div class="header_btns">
                  <a  class="btn_style" onClick={()=>navigate('/account')}>
                    Login
                  </a>
                  <a  class="btn_style btn_style2" onClick={()=>navigate('/account')}>
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <!--================  End Header Section  ================-->

        <!--================  Start Banner Section  ================--> */}
      <div class="banner_main">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="banner">
                <div class="banner_contents">
                  <div class="default_title">
                    <p>
                      <img src={logoDark} alt="" />
                      World's 1st AI Agent Marketer
                    </p>
                  </div>
                  <h2>Put Your Paid Advertising Campaigns On Autopilot</h2>
                  <p>
                    Introducing Your Own Autonomous AI Agent That Creates,
                    Manages, And Optimizes Your Paid Advertising Campaigns On
                    Autopilot
                  </p>
                  <div class="banner_btns">
                    <a href="#" class="btn_style">
                      <i class="fas fa-arrow-right"></i>Get Started
                    </a>
                  </div>
                  <div class="banner_social">
                    <ul>
                      <li>
                        <a href="https://www.facebook.com/profile.php?id=61567499648168">
                          <img src={facebook} alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={instagram} alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/@RoboMarketer">
                          <img src= {youtube} alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={linkedin} alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={x} alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={tiktok} alt="" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  class="banner_video"
                  id="playVideoTrigger"
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  <img src={bannerVideo} alt="" />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "60px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    <i class="fas fa-play-circle"></i>
                  </div>
                </div>
<VideoPopup/>
               

                <div class="banner_bottom_contents">
                  <div class="banner_content_single">
                    <h1>1,000+</h1>
                    <p>Campaigns Created</p>
                  </div>
                  <div class="banner_content_single">
                    <h1>30,000+</h1>
                    <p>Leads Generated</p>
                  </div>
                  <div class="banner_content_single">
                    <h1>$5M+</h1>
                    <p>Revenue Generated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--================  End Banner Section  ================-->

        <!--================  Start Business Section  ================--> */}
      <div class="business_main">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="business">
                <div class="section_title">
                  <h2>Built For Any Business</h2>
                  <p>
                    RoboMarketer was designed to drive results for businesses of
                    all types and sizes
                  </p>
                </div>
                <div class="business_contents">
                  <div class="business_single_box">
                    <span>
                      <img src={business1} alt="" />
                    </span>
                    <h4>Marketing Agency & Freelancers</h4>
                    <p>
                      Effortlessly Setup, Manage, And Optimize 100’s Of Client
                      Marketing Campaigns On Autopilot With Even Higher Client
                      Satisfaction
                    </p>
                  </div>
                  <div class="business_single_box">
                    <span>
                      <img src={business2}alt="" />
                    </span>
                    <h4>Local Businesses & Startups</h4>
                    <p>
                      Leverage Your Own Autonomous AI Agent Marketer That Does
                      The Work Of An Entire $300K+/Year Marketing Team On
                      Autopilot With Even Better Performance
                    </p>
                  </div>
                  <div class="business_single_box">
                    <span>
                      <img src={business3} alt="" />
                    </span>
                    <h4>Large Enterprise Businesses</h4>
                    <p>
                      Supercharge Your Marketing Department With An AI Agent
                      Marketer That Operates 24/7 365 To Provide Superhuman
                      Data-Driven Insights With Unmatched Efficiency
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--================  End Business Section  ================-->

        <!--================  Start Autopilot Section  ================--> */}
      <div class="autopilot_main">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="autopilot">
                <div class="section_title autopilot_title">
                  <h2>
                    Setup, Manage, And Optimize Marketing Campaigns On Autopilot
                  </h2>
                  <p>
                    How RoboMarketer delivers marketing campaigns that
                    outperform human marketers in 3 simple steps
                  </p>
                </div>
                <div class="autopilot_contents">
                  <div class="autopilot_contents_text">
                    <div class="default_title">
                      <p>Step # 1</p>
                    </div>
                    <h3>Build Your RoboMarketerIQ Brain</h3>
                    <p>
                      Setup Your Personalized Knowledge Base With Detailed
                      Information On Your Products, Customer Avatar,
                      Preferences, And Target Goals/KPIs Which Will Be Utilized
                      To Custom-Tailor Your AI Agent RoboMarketer
                    </p>
                  </div>
                  <div class="autopilot_contents_img">
                    <img src={autopilot1} alt="" />
                  </div>
                </div>
                <div class="autopilot_contents">
                  <div class="autopilot_contents_img">
                    <img src={autopilot2} alt="" />
                  </div>
                  <div class="autopilot_contents_text">
                    <div class="default_title">
                      <p>Step # 2</p>
                    </div>
                    <h3>AI-Powered Paid Advertising Campaign Creation</h3>
                    <p>
                      RoboMarketer Will Automatically Generate Customized Paid
                      Advertising Campaigns Based On Your Target KPIs/Goals,
                      Historical Ad Account Data, And Standard Operating
                      Procedures
                    </p>
                  </div>
                </div>
                <div class="autopilot_contents">
                  <div class="autopilot_contents_text">
                    <div class="default_title">
                      <p>Step # 3</p>
                    </div>
                    <h3>SuperHuman Data-Driven Optimization Recommendations</h3>
                    <p>
                      Robomarketer Will Leverage Its Superhuman AI-Powered Data
                      Analysis Capabilities To Analyze Historical Campaign Data
                      And Provide Contextual Data-Driven Recommendations To
                      Supercharge Your Campaign Performance
                    </p>
                  </div>
                  <div class="autopilot_contents_img">
                    <img src={autopilot3} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--================  End Autopilot Section  ================-->

        <!--================  Start Lifetime Plans Section  ================--> */}
      <div class="lifetime_plans_main">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="lifetime_plans">
                <div class="section_title">
                  <div class="default_title mb-4">
                    <p>Lifetime Plans</p>
                  </div>
                  <h2>RoboMarketer Lifetime Deals</h2>
                  <p>
                    Take advantage of RoboMarketer Lifetime Deals for Limited
                    Time!
                  </p>
                </div>
                <div class="lifetime_plans_contents">
                  <div class="lifetime_plans_contents_single">
                    <div class="lpc_single_title">
                      <p>Business</p>
                    </div>
                    <div class="lpc_single_contents">
                      <div class="lpc_single_contents_top">
                        <h1>$1,500</h1>
                        <p>One-Time Payment Own It For LIFE!</p>
                        <a href="#">Get Started</a>
                      </div>
                      <div class="lpc_single_contents_bottom">
                        <p>Whats Included:</p>
                        <ul>
                          <li>1 RoboMarketer Lifetime Account</li>
                          <li>Dedicated Client Account Manager</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="lifetime_plans_contents_single">
                    <div class="lpc_single_title">
                      <p>Agency</p>
                    </div>
                    <div class="lpc_single_contents">
                      <div class="lpc_single_contents_top">
                        <h1>$2,500</h1>
                        <p>One-Time Payment Own It For LIFE!</p>
                        <a href="#">Get Started</a>
                      </div>
                      <div class="lpc_single_contents_bottom">
                        <p>Whats Included:</p>
                        <ul>
                          <li>3 RoboMarketer Lifetime Accounts</li>
                          <li>Dedicated Client Account Manager</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="lifetime_plans_contents_single">
                    <div class="lpc_single_title">
                      <p>Agency +</p>
                    </div>
                    <div class="lpc_single_contents">
                      <div class="lpc_single_contents_top">
                        <h1>$5,000</h1>
                        <p>One-Time Payment Own It For LIFE!</p>
                        <a href="#">Get Started</a>
                      </div>
                      <div class="lpc_single_contents_bottom">
                        <p>Whats Included:</p>
                        <ul>
                          <li>10 RoboMarketer Lifetime Accounts</li>
                          <li>Priority Client Account Manager</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--================  End Lifetime Plans Section  ================-->

        <!--================  Start RoboMarketer Reviews Section  ================--> */}
      <div class="robomarketer_reviews_main">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="robomarketer_reviews">
                <div class="section_title">
                  <div class="default_title mb-4">
                    <p>RoboMarketer Success</p>
                  </div>
                  <h2>RoboMarketer Reviews</h2>
                  <p>Listen To What Our Users Say About RoboMarketer</p>
                </div>
                <div class="robomarketer_reviews_contents">
                  <div class="robomarketer_reviews_single">
                    <div class="robomarketer_reviews_single_top">
                      <div class="robomarketer_reviews_img">
                        <img src={Joe} alt="" />
                      </div>
                      <div class="robomarketer_reviews_title">
                        <p>
                          “RoboMarketer’s recommendations feature has saved us
                          dozens of hours per week analyzing data and manually
                          optimizing our Facebook ad campaigns. We’ve been able
                          to increase our ROAS by over 15% in just the first
                          month. It's like having a senior-level data analyst on
                          staff that works 24/7 to uncover profitable
                          opportunities for our team”
                        </p>
                        <h4>- Jack W.</h4>
                        <p>
                          <i>Director of Digital Marketing</i>
                        </p>
                      </div>
                    </div>
                    <div class="robomarketer_reviews_title_mobile">
                      <h4>
                        - Jack W. (<i>Director of Digital Marketing</i>)
                      </h4>
                    </div>
                  </div>
                  <div class="robomarketer_reviews_single">
                    <div class="robomarketer_reviews_single_top">
                      <div class="robomarketer_reviews_img">
                        <img src={client2} alt="" />
                      </div>
                      <div class="robomarketer_reviews_title">
                        <p>
                          "After using RoboMarketer on a daily basis for the
                          last couple months now, I honestly can’t imagine ever
                          running ads again without it. We’ve not only reduced
                          wasted ad spend, but have also been able to achieve a
                          higher average ROAS across all our campaigns."
                        </p>
                        <h4>- Ryan V.</h4>
                        <p>
                          <i>Head of Paid Media</i>
                        </p>
                      </div>
                    </div>
                    <div class="robomarketer_reviews_title_mobile">
                      <h4>
                        - Ryan V. (<i>Head of Paid Media</i>)
                      </h4>
                    </div>
                  </div>
                  <div class="robomarketer_reviews_single">
                    <div class="robomarketer_reviews_single_top">
                      <div class="robomarketer_reviews_img">
                        <img src={client3} alt="" />
                      </div>
                      <div class="robomarketer_reviews_title">
                        <p>
                          "We’ve been able to double our client load while
                          reducing time spent on account management by 40%.
                          RoboMarketer lets us handle more campaigns with less
                          work and even better performance. It has become an
                          essential tool for our agency.”
                        </p>
                        <h4>– Michelle H.</h4>
                        <p>
                          <i>Head of Client Success</i>
                        </p>
                      </div>
                    </div>
                    <div class="robomarketer_reviews_title_mobile">
                      <h4>
                        – Michelle H. (<i>Head of Client Success</i>)
                      </h4>
                    </div>
                  </div>
                  <div class="robomarketer_reviews_single">
                    <div class="robomarketer_reviews_single_top">
                      <div class="robomarketer_reviews_img">
                        <img src={client4} alt="" />
                      </div>
                      <div class="robomarketer_reviews_title">
                        <p>
                          "I’ve been a marketer for over a decade, and
                          RoboMarketer is hands-down the most impressive AI tool
                          I’ve used so far. It doesn’t just automate tasks, it
                          provides insights that I've never even thought of.
                          It’s like having another senior-level expert on the
                          team, and the results are undeniable."
                        </p>
                        <h4>– William B.</h4>
                        <p>
                          <i>Senior Digital Strategist</i>
                        </p>
                      </div>
                    </div>
                    <div class="robomarketer_reviews_title_mobile">
                      <h4>
                        – William B. (<i>Senior Digital Strategist</i>)
                      </h4>
                    </div>
                  </div>
                  <div class="robomarketer_reviews_single">
                    <div class="robomarketer_reviews_single_top">
                      <div class="robomarketer_reviews_img">
                        <img src={client5} alt="" />
                      </div>
                      <div class="robomarketer_reviews_title">
                        <p>
                          "I was spending dozens of hours per week trying to run
                          my own Facebook ad campaigns with poor results.
                          RoboMarketer has been able to generate higher quality
                          leads at lower costs with barely any input on my end.
                          It’s a must-have for any business owner that doesn’t
                          want to spend $1,000s per month to hire an agency"
                        </p>
                        <h4>– Emily P.</h4>
                        <p>
                          <i>Graphic Design Freelancer</i>
                        </p>
                      </div>
                    </div>
                    <div class="robomarketer_reviews_title_mobile">
                      <h4>
                        – Emily P. (<i>Graphic Design Freelancer</i>)
                      </h4>
                    </div>
                  </div>
                  <div class="robomarketer_reviews_single">
                    <div class="robomarketer_reviews_single_top">
                      <div class="robomarketer_reviews_img">
                        <img src={client6} alt="" />
                      </div>
                      <div class="robomarketer_reviews_title">
                        <p>
                          "RoboMarketer is the reason we’ve been able to take on
                          15 new clients this quarter without hiring more staff.
                          I honestly feel like I could handle 50+ client
                          accounts by myself, it’s that powerful.
                        </p>
                        <h4>– Jackie D.</h4>
                        <p>
                          <i>Marketing Agency Owner</i>
                        </p>
                      </div>
                    </div>
                    <div class="robomarketer_reviews_title_mobile">
                      <h4>
                        – Jackie D. (<i>Marketing Agency Owner</i>)
                      </h4>
                    </div>
                  </div>
                  <div class="robomarketer_reviews_single">
                    <div class="robomarketer_reviews_single_top">
                      <div class="robomarketer_reviews_img">
                        <img src={client7} alt="" />
                      </div>
                      <div class="robomarketer_reviews_title">
                        <p>
                          "I was initially paying $3,000 per month to a
                          marketing agency to run my ads with very mediocre
                          results. RoboMarketer has been able to come in and
                          within a month begin to outperform their Facebook ad
                          campaigns with a much lower cost per lead. Extremely
                          impressed to say the least.”
                        </p>
                        <h4>– Mike S.</h4>
                        <p>
                          <i>Local Business Owner</i>
                        </p>
                      </div>
                    </div>
                    <div class="robomarketer_reviews_title_mobile">
                      <h4>
                        – Mike S. (<i>Local Business Owner</i>)
                      </h4>
                    </div>
                  </div>
                  <div class="robomarketer_reviews_single">
                    <div class="robomarketer_reviews_single_top">
                      <div class="robomarketer_reviews_img">
                        <img src={client8} alt="" />
                      </div>
                      <div class="robomarketer_reviews_title">
                        <p>
                          "RoboMarketer practically runs my store’s campaigns
                          for me now. I simply wake up to reports showing what's
                          working and what's not, and then receive
                          recommendations on what actions to take to improve my
                          ad’s performance which I can implement with a single
                          click.”
                        </p>
                        <h4>– Chris D.</h4>
                        <p>
                          <i>Ecommerce Store Owner</i>
                        </p>
                      </div>
                    </div>
                    <div class="robomarketer_reviews_title_mobile">
                      <h4>
                        – Chris D. (<i>Ecommerce Store Owner</i>)
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--================  End RoboMarketer Reviews Section  ================-->

        <!--================  Start RoboMarketer Education Section  ================--> */}
      <div class="robomarketer_education_main">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="robomarketer_education">
                <div class="section_title">
                  <div class="default_title mb-4">
                    <p>RoboMarketer Education</p>
                  </div>
                  <h2>RoboMarketer Resources</h2>
                  <p>Learn More About RoboMarketer</p>
                </div>
                <div class="robomarketer_education_contents">
                  <div class="robomarketer_education_single">
                    {/* <!-- <img src="/../../assets/images/education1.png" alt=""/> --> */}
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/T7YkqjIbTcs?si=k8zC_k78vzrvNo3c"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div class="robomarketer_education_single">
                    {/* <!-- <img src="/../../assets/images/education2.png" alt=""/> --> */}
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/sIyrlC-wvsg?si=JQUvWZU2d_mlFUOH"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--================  End RoboMarketer Education Section  ================-->

        <!--================  Start Lifetime Deal Section  ================--> */}
      <div class="robomarketer_lifetimedeal_main">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="robomarketer_lifetimedeal">
                <h2>Get RoboMarketer Lifetime Deal</h2>
                <a href="#" class="btn_style btn_style2">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--================  End Lifetime Deal Section  ================-->

        <!--================  Start Frequently Asked Questions Section  ================--> */}
      <div class="question_answer_main" styles={{ paddingTop: "0px" }}>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="question_answer">
                <div class="section_title">
                  <div class="default_title mb-4">
                    <p>Q&A</p>
                  </div>
                  <h2>Frequently Asked Questions</h2>
                </div>
                <div class="question_answer_contents">
                  <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingOne">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          What is RoboMarketer?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          RoboMarketer is an AI agent that automates the
                          creation, monitoring, and optimization of your paid
                          advertising campaigns, driving superior results with
                          minimal effort.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingTwo">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          How Does RoboMarketer Run Paid Advertising Campaigns
                          On Autopilot?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          RoboMarketer analyzes real-time data and performance
                          metrics to make informed adjustments, ensuring your
                          campaigns consistently achieve optimal outcomes
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingThree">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          What Types of Businesses Can Benefit From
                          RoboMarketer?
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          RoboMarketer is perfect for businesses of all sizes
                          and industries, including local businesses, startups,
                          freelancers, agencies, and enterprises. Whether you’re
                          scaling or optimizing existing campaigns, RoboMarketer
                          adapts to your needs.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingFour">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="headingFour"
                        >
                          What Advertising Platforms Does RoboMarketer Support?
                        </button>
                      </h2>
                      <div
                        id="collapseFour"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          RoboMarketer integrates with popular ad platforms like
                          Facebook, Instagram, Google Ads, and more. It ensures
                          seamless campaign management across multiple channels
                          from a single dashboard.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingFive">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFive"
                          aria-expanded="false"
                          aria-controls="collapseFive"
                        >
                          Can RoboMarketer Handle Multiple Ad Accounts?
                        </button>
                      </h2>
                      <div
                        id="collapseFive"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingFive"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          Yes! RoboMarketer is built for scalability, allowing
                          users to manage multiple ad accounts effortlessly,
                          making it ideal for agencies and businesses with
                          diverse advertising needs.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingSix">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseSix"
                          aria-expanded="false"
                          aria-controls="collapseSix"
                        >
                          How Does RoboMarketer Learn & Improve Performance Over
                          Time?
                        </button>
                      </h2>
                      <div
                        id="collapseSix"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingSix"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          RoboMarketer learns from historical campaign data,
                          user-defined goals, and real-time performance metrics.
                          Over time, it fine-tunes strategies to deliver
                          increasingly better results.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingSeven">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseSeven"
                          aria-expanded="false"
                          aria-controls="collapseSeven"
                        >
                          How Secure is My Data with RoboMarketer?
                        </button>
                      </h2>
                      <div
                        id="collapseSeven"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingSeven"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          RoboMarketer prioritizes security, with
                          state-of-the-art encryption and strict data privacy
                          policies to ensure your information remains safe and
                          confidential.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingEight">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseEight"
                          aria-expanded="false"
                          aria-controls="collapseEight"
                        >
                          What Kind of Support Does RoboMarketer Provide?
                        </button>
                      </h2>
                      <div
                        id="collapseEight"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingEight"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          RoboMarketer offers 24/7 customer support via chat and
                          email. Additionally, we provide onboarding assistance
                          and tutorials to help you get started.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--================  End Frequently Asked Questions Section  ================--> */}

      {/* <!--================  Start Footer Section  ================--> */}
      <footer class="footer_main">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="footer">
                <div class="footer_logo">
                  <a href="">
                    <img src={logo} alt="" />
                  </a>
                </div>
                <div class="footer_contents">
                  <ul>
                    <li>
                      <a href="/privacy-policy/">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="/terms-and-conditions/">Terms of Service</a>
                    </li>
                    <li>
                      <a href="/data-protection-compliance-policy/">
                        Data Protection Policy
                      </a>
                    </li>
                  </ul>
                  <p>© Copyright 2025 RoboMarketer. All rights reserved.</p>
                </div>
                <div class="banner_social footer_social">
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/profile.php?id=61567499648168">
                        <img src={facebook} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={instagram} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/@RoboMarketer">
                        <img src={youtube} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={linkedin} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={x} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={tiktok} alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageMain;

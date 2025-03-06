import React, { useEffect } from "react";
import "./styles/InfoContainer.css";
const InfoContainer = ({ dataType }) => {
  useEffect(() => {}, [dataType]);
  return (
    <>
      <div id="info-container">
        <div className="info-wrapper">
          {dataType == "privacy-policy" && (
            <>
              <div className="info-header">
                <h1 className="info-title">Privacy Policy</h1>
                <p className="info-updated">
                  <em>Last Updated: Feb 5, 2025</em>
                </p>
              </div>
              <h2 className="section-title">1. Acceptance of Terms</h2>
              <p className="section-text"> By accessing or using RoboMarketer ("we," "us," "our," or "the Service"), you agree to these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service. These Terms form a binding agreement between you and RoboMarketer. </p>
            
             <h2 className="section-title">2. Description of Services</h2>
              <p className="section-text"> RoboMarketer provides marketing automation tools, including AI-based ad campaign setup, management, and optimization for platforms such as Facebook Ads, Google Ads, and other integrated APIs ("Services"). We may update or improve the Services from time to time without prior notice. </p>

              <h2 className="section-title">3. Eligibility</h2>
              <p className="section-text"> You must be at least 18 years of age to use RoboMarketer. By using the Services, you represent and warrant that: You have the authority to enter into these Terms.You will use the Service in compliance with all applicable laws and regulations. </p>

              <h2 className="section-title">4. Account Registration</h2>
              <p className="section-text"> To use the Service, you may need to create an account. You agree to: </p>
              <ul className="info-list">
                <li> Provide accurate and complete information during registration. </li>
                <li>Keep your account credentials confidential.</li>
                <li> Notify us immediately of any unauthorized access or security breaches. </li>
              </ul>
              <p className="section-text"> You are responsible for all activities conducted under your account. </p>

              <h2 className="section-title">5. Use of the Service</h2>
              <p className="section-text"> You agree to use RoboMarketer only for lawful purposes. Prohibited activities include (but are not limited to): </p>
              <ul className="info-list">
                <li>Engaging in fraudulent or deceptive advertising.</li>
                <li> Violating intellectual property rights or any third-party agreements. </li>
                <li> Using the Service to create harmful, obscene, or illegal content. </li>
                <li> Interfering with the security or integrity of the Service. </li>
              </ul>

              <h2 className="section-title"> 6. Integration with Third-Party Platforms  </h2>
              <p className="section-text"> RoboMarketer integrates with third-party services like Facebook Ads, Google Ads, and HubSpot. By connecting your accounts, you authorize RoboMarketer to access, retrieve, and modify data on your behalf. Important: Your use of third-party platforms is subject to their own terms of service and privacy policies. We are not responsible for the actions or policies of these third-party services. </p>

              <h2 className="section-title">7. Fees and Payments</h2>
              <h3 className="subsection-title">7.1 Subscription and Fees</h3>
              <p className="section-text"> Certain features of RoboMarketer may require a paid subscription. Fees and billing details will be specified at the time of purchase. </p>

              <h3 className="subsection-title">7.2 Payment Terms</h3>
              <p className="section-text"> You authorize us to charge your payment method for applicable fees. Subscription fees are non-refundable unless otherwise stated. Failure to pay fees may result in suspension or termination of your account. </p>

              <h2 className="section-title"> 8. License and Intellectual Property </h2>
              <p className="section-text"> We grant you a limited, non-exclusive, non-transferable license to access and use RoboMarketer for your business purposes. You may not: </p>
              <ul className="info-list">
                <li> Copy, distribute, or modify any part of the Service without permission. </li>
                <li> Use our trademarks, logos, or other intellectual property without authorization. </li>
              </ul>
              <p className="section-text"> All rights not expressly granted in these Terms are reserved by RoboMarketer. </p>

              <h2 className="section-title">9. User Content</h2>
              <p className="section-text"> You retain ownership of any content you upload or input into RoboMarketer ("User Content"). By using the Service, you grant us a worldwide, royalty-free license to use, store, and display your User Content for the purpose of providing the Service. </p>

              <h2 className="section-title">10. Data Privacy</h2>
              <p className="section-text"> Our use of your personal data is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you agree to the collection and use of your data as outlined in the Privacy Policy. </p>

              <h2 className="section-title">11. Termination and Suspension</h2>
              <p className="section-text"> We reserve the right to suspend or terminate your access to RoboMarketer at any time for reasons including (but not limited to):</p>
              <p className="section-text"> Violation of these Terms.Non-payment of subscription fees.Unauthorized or harmful use of the Service.</p>
              <p className="section-text"> You may terminate your account at any time by contacting us. Upon termination, your right to use the Service will end, but certain provisions (e.g., intellectual property rights and liability limitations) will continue to apply.</p>

              <h2 className="section-title">12. Disclaimer of Warranties</h2>
              <p className="section-text"> RoboMarketer is provided</p>
              <p>"as is" without any warranties of any kind, whether express or implied. We do not guarantee that the Service will be: Uninterrupted or error-free.Compatible with all third-party platforms.Free of viruses or harmful components. We disclaim all warranties, including those of merchantability, fitness for a particular purpose, and non-infringement.</p>

              <h2 className="section-title">13. Limitation of Liability</h2>
              <p className="section-text"> To the fullest extent permitted by law, RoboMarketer and its affiliates are not liable for any:
              </p>
              <p>Indirect, incidental, or consequential damages.Loss of profits, revenue, or data.Damages resulting from your use of or inability to use the Service. Our total liability is limited to the amount you paid for the Service in the 12 months preceding the event giving rise to the claim. </p>

              <h2 className="section-title">14. Indemnification</h2>
              <p className="section-text">You agree to indemnify and hold RoboMarketer harmless from any claims, damages, losses, or liabilities arising from: Your use of the Service.Your violation of these Terms.Any content or data you provide through the Service. </p>

              <h2 className="section-title">15. Modifications to the Terms</h2>
              <p className="section-text"> We may update these Terms from time to time. If we make significant changes, we will notify you via the Service or by email. Continued use of RoboMarketer after the changes take effect constitutes your acceptance of the updated Terms. </p>

              <h2 className="section-title">16. Governing Law and Dispute Resolution</h2>
              <p className="section-text"> These Terms are governed by the laws of [Insert Jurisdiction], without regard to its conflict of laws principles. Any disputes arising under these Terms will be resolved through: Negotiation: Attempt to resolve the dispute informally.Arbitration: If negotiation fails, disputes will be resolved through binding arbitration, unless prohibited by law.</p>

              <h2 className="section-title">17. Force Majeure</h2>
              <p className="section-text"> We are not liable for delays or failures to perform due to events beyond our control, including natural disasters, internet outages, government actions, or labor disputes.</p>

              <h2 className="section-title">18. Entire Agreement</h2>
              <p className="section-text">These Terms, along with our Privacy Policy, constitute the entire agreement between you and RoboMarketer. They supersede any prior agreements or understandings related to the Service.</p>

              <h2 className="section-title">19. Contact Information</h2>
              <p className="section-text"> If you have questions or concerns about these Terms, please contact us: </p>
              <p className="info-contact">Email: info@robomarketer.bot</p>
              <p className="info-contact">Phone: 707-536-4986</p>
              <p className="info-contact">Website: robomarketer.bot</p>
            </>
          )}
          {dataType == "terms-of-service" && (
            <>
              <div className="info-header">
                <h1 className="info-title">Terms Of Service</h1>
                <p className="info-updated">
                  <em>Last Updated: Feb 5, 2025</em>
                </p>
              </div>
              <h2 className="section-title">1. Acceptance of Terms</h2>
              <p className="section-text"> By accessing or using RoboMarketer ("we," "us," "our," or "the Service"), you agree to these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service. These Terms form a binding agreement between you and RoboMarketer. </p>
            
             <h2 className="section-title">2. Description of Services</h2>
              <p className="section-text"> RoboMarketer provides marketing automation tools, including AI-based ad campaign setup, management, and optimization for platforms such as Facebook Ads, Google Ads, and other integrated APIs ("Services"). We may update or improve the Services from time to time without prior notice. </p>

              <h2 className="section-title">3. Eligibility</h2>
              <p className="section-text"> You must be at least 18 years of age to use RoboMarketer. By using the Services, you represent and warrant that: You have the authority to enter into these Terms.You will use the Service in compliance with all applicable laws and regulations. </p>

              <h2 className="section-title">4. Account Registration</h2>
              <p className="section-text"> To use the Service, you may need to create an account. You agree to: </p>
              <ul className="info-list">
                <li> Provide accurate and complete information during registration. </li>
                <li>Keep your account credentials confidential.</li>
                <li> Notify us immediately of any unauthorized access or security breaches. </li>
              </ul>
              <p className="section-text"> You are responsible for all activities conducted under your account. </p>

              <h2 className="section-title">5. Contact Information</h2>
              <p className="section-text"> If you have questions or concerns about these Terms, please contact us: </p>
              <p className="info-contact">Email: info@robomarketer.bot</p>
              <p className="info-contact">Phone: 707-536-4986</p>
              <p className="info-contact">Website: robomarketer.bot</p>
            </>
          )}
          {dataType == "data-protection-policy" && (
            <>
              <div class="info-header">
                <h1 class="info-title">Data Protection & Compliance Policy</h1>
                <p class="info-updated">
                  <em>
                    <b>Effective Date:</b> February 1, 2025
                  </em>
                </p>
              </div>

              <h2 class="section-title">1. Introduction</h2>

              <p class="section-text">
                RoboMarketer (“we,” “our,” or “us”) is an AI marketing
                automation platform designed to optimize advertising performance
                through data-driven insights. As a Facebook Marketing API
                partner, we are committed to maintaining strict compliance with
                Facebook's Developer Policies, Data Protection Laws (including
                GDPR and CCPA), and all applicable regulatory requirements.
                <br />
                This policy outlines our approach to data collection,
                processing, storage, sharing, retention, law enforcement
                cooperation, and user rights to ensure full compliance with
                Facebook’s Tech Provider verification requirements and API
                permissions policies.
              </p>

              <h2 class="section-title">2. Data Collection and Usage</h2>

              <h3 class="subsection-title">2.1 Data Collected from Facebook</h3>

              <p class="section-text">
                In order to provide RoboMarketer’s ad optimization and reporting
                services, we collect and process the following data through the
                Facebook Marketing API, strictly with user authorization:
              </p>

              <ul class="info-list">
                <li>
                  <b>Ad Account Performance Data: </b>Includes campaign
                  structure, budgets, return on ad spend (ROAS), cost per
                  acquisition (CPA), click-through rate (CTR), impressions,
                  audience targeting, and related metrics.
                </li>
                <li>
                  <b>Creative Performance Metrics:</b> Engagement data such as
                  video views, click engagement, and ad conversion performance.
                </li>
                <li>
                  <b> Custom Audiences and Segments: </b>If applicable, and only
                  with explicit user permission.
                </li>
                <li>
                  <b>Ad Spend and Attribution Data:</b> Used solely for
                  optimizing advertising performance.
                </li>
                <li>
                  <b>Page Engagement Data:</b> Insights on both organic and paid
                  engagement for AI-driven campaign improvements.
                </li>
              </ul>

              <h3 class="subsection-title">2.2 Purpose of Data Usage</h3>

              <p class="section-text">
                RoboMarketer processes collected data exclusively for the
                following purposes:
              </p>

              <ul class="info-list">
                <li>
                  Automating advertising optimization through AI-driven
                  recommendations.
                </li>
                <li>
                  Providing detailed performance reports and campaign insights.
                </li>
                <li>
                  Enhancing audience segmentation to improve ad targeting.
                </li>
                <li>
                  Identifying inefficiencies and fraud detection in advertising
                  campaigns.
                </li>
              </ul>

              <p class="section-text">
                RoboMarketer does not use Facebook data for unauthorized
                retargeting, nor do we share Facebook API data with third
                parties unless expressly authorized by the user or required by
                law. All data access strictly adheres to Facebook's Developer
                Policies, and permissions requested are limited to what is
                necessary for the functionality of our platform.
              </p>

              <h2 class="section-title">
                3. Data Retention and Deletion Policy
              </h2>

              <table class="info-table">
                <thead>
                  <tr>
                    <th>Data Type</th>
                    <th>Retention Period</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ad performance data</td>
                    <td>60 days</td>
                    <td>AI optimization and reporting</td>
                  </tr>
                  <tr>
                    <td>Audience segmentation data</td>
                    <td>30 days</td>
                    <td>Short-term campaign optimization</td>
                  </tr>
                  <tr>
                    <td>Page insights & engagement</td>
                    <td>90 days</td>
                    <td>Campaign performance tracking</td>
                  </tr>
                  <tr>
                    <td>Facebook API access tokens</td>
                    <td>Until revoked</td>
                    <td>Required for authentication</td>
                  </tr>
                  <tr>
                    <td>Custom audiences (if applicable)</td>
                    <td>7 days maximum</td>
                    <td>Temporary execution for audience targeting</td>
                  </tr>
                </tbody>
              </table>

              <p class="section-text">
                Users may request data deletion at any time by contacting{" "}
                <a href="mailto:data@robomarketer.bot">data@robomarketer.bot</a>
                . Data is automatically deleted if a user revokes API access or
                deactivates their RoboMarketer account.
              </p>

              <h2 class="section-title">
                4. Data Sharing and Third-Party Disclosure
              </h2>

              <p class="section-text">
                RoboMarketer does not sell, rent, or disclose user data to third
                parties except in the following circumstances:
              </p>

              <ul class="info-list">
                <li>
                  <b>To Facebook (Meta):</b> As required for API functionality
                  and compliance.
                </li>
                <li>
                  <b>To Law Enforcement Agencies: </b>In response to a valid
                  legal request, such as a subpoena, court order, or legal
                  process.
                </li>
                <li>
                  <b>To Authorized Service Providers: </b>Engaged for hosting,
                  analytics, and AI processing under strict data protection
                  agreements.
                </li>
              </ul>

              <h2 class="section-title">
                5. Law Enforcement Requests and Compliance
              </h2>

              <p class="section-text">
                Law enforcement requests must be submitted to{" "}
                <a href="mailto:legal@robomarketer.bot">
                  legal@robomarketer.bot
                </a>{" "}
                for verification and processing.
              </p>

              <h2 class="section-title">
                6. User Rights and Data Access Requests
              </h2>

              <p class="section-text">Users have the following rights:</p>

              <ul class="info-list">
                <li>
                  <b> Right to Access: </b>Users may request a copy of their
                  stored data.
                </li>
                <li>
                  <b>Right to Deletion: </b>Users may request the removal of
                  their data from RoboMarketer’s systems.
                </li>
                <li>
                  <b>Right to Portability: </b>Users may request their data in a
                  structured, machine-readable format.
                </li>
                <li>
                  <b> Right to Withdraw Consent: </b>Users may revoke API
                  permissions at any time through Facebook Business Manager.
                </li>
              </ul>

              <p class="section-text">
                All user data requests will be processed within legally required
                timeframes. Requests can be submitted through{" "}
                <a href="mailto:data@robomarketer.bot">data@robomarketer.bot</a>
                .
              </p>

              <h2 class="section-title">
                7. Security and Data Protection Measures
              </h2>

              <ul class="info-list">
                <li>
                  <b>Data Encryption: </b>All data is encrypted in transit using
                  TLS 1.2+ and at rest using AES-256 encryption.
                </li>
                <li>
                  <b>Access Controls: </b>Strict access permissions are enforced
                  to prevent unauthorized data access.
                </li>
                <li>
                  <b> Tokenized API Authentication:</b> Facebook access tokens
                  are securely managed using OAuth protocols.
                </li>
                <li>
                  <b>Regular Security Audits:</b> Security reviews and
                  vulnerability assessments are conducted periodically.
                </li>
              </ul>

              <h2 class="section-title">
                8. Compliance with Facebook’s Policies
              </h2>

              <p class="section-text">
                RoboMarketer complies with Facebook Developer Policies, Platform
                Terms, and Data Use Policy.
              </p>

              <h2 class="section-title">9. Contact and Support</h2>

              <p class="section-text">
                For any questions or concerns regarding this Data Protection &
                Compliance Policy, please contact:
              </p>

              <p class="info-contact">
                Email:{" "}
                <a href="mailto:legal@robomarketer.bot">
                  legal@robomarketer.bot
                </a>
              </p>
              <p class="info-contact">
                Website:{" "}
                <a href="https://robomarketer.bot" target="_blank">
                  robomarketer.bot
                </a>
              </p>
              <p class="info-contact">Phone: 707-536-4986</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InfoContainer;

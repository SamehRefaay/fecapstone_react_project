import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<>
			<section class="hero-section">
				<div className="container">
					<div>
						<div data-aos="fade-up" class="flex-hero">
							<h1>
								Your Health
								<br />
								<span class="text-gradient">Our Responsibility</span>
							</h1>
							<div class="blob-cont">
								<div class="blue blob"></div>
							</div>
							<div class="blob-cont">
								<div class="blue1 blob"></div>
							</div>
							<h4>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
								at quae ducimus. Suscipit omnis quibusdam non cum rem
								voluptatem!
							</h4>
							<a href="/best-services">
								<button class="button">Get Started</button>
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default LandingPage;

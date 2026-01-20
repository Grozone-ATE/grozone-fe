import React from "react";
import Layouts from "@layouts/Layouts";
import dynamic from "next/dynamic";

import { getSortedPostsData } from "@library/posts";
import { getSortedProjectsData } from "@library/projects";

import HeroOneSection from "@components/sections/HeroOne"
import AboutSection from "@components/sections/About";
import ServicesSection from "@components/sections/Services";
import TeamSection from "@components/sections/Team";
import LatestPostsSection from "@components/sections/LatestPosts";

const TestimonialSlider = dynamic( () => import("@components/sliders/Testimonial"), { ssr: false } );
const PartnersSlider = dynamic( () => import("@components/sliders/Partners"), { ssr: false } );

const Home1 = (props) => {
  return (
    <Layouts>
      <HeroOneSection />
      <AboutSection />
      <ServicesSection projects={props.projects} allProjects={props.allProjects} />
      <TeamSection />
      <TestimonialSlider />
      {false && <PartnersSlider />}
      {false && <LatestPostsSection posts={props.posts} />}
    </Layouts>
  );
};
export default Home1;

export async function getStaticProps() {
  const allPosts = getSortedPostsData();
  const allProjects = getSortedProjectsData();
  // Get only project-1 and project-2 for featured banners
  const featuredProjects = allProjects.filter(p => p.id === 'project-1' || p.id === 'project-2');
  // Get all projects for the 6 cards
  const allProjectsForCards = allProjects;

  return {
    props: {
      posts: allPosts,
      projects: featuredProjects,
      allProjects: allProjectsForCards
    }
  }
}
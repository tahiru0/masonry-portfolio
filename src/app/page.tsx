'use client';

import MasonryGrid from '../components/MasonryGrid';
import { MdCode, MdPalette, MdPublic, MdSmartphone, MdStorage, MdCloud, MdSecurity, MdFlashOn, MdPeople, MdBarChart, MdMenuBook, MdEmojiEvents, MdMail, MdStar, MdCalendarToday, MdLocationOn, MdCodeOff, MdDns, MdPhoneAndroid, MdComputer, MdDataUsage, MdCloudQueue } from 'react-icons/md';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { SiX } from 'react-icons/si';
import { useState, useEffect } from 'react';
import portfolioData from '../../data/portfolio.json';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  twitter_username: string;
  html_url: string;
}

// Function to convert icon string to component
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    MdStar, MdCode, MdComputer, MdSmartphone, MdDns, MdStorage, MdCloud,
    MdEmojiEvents, MdMail, MdCalendarToday, MdLocationOn,
    SiGithub, SiLinkedin, SiX
  };
  return iconMap[iconName];
};

// Function to convert skill icon strings to components
const processSkills = (skills: any[]) => {
  return skills.map(skill => ({
    ...skill,
    icon: getIconComponent(skill.icon)
  }));
};

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [githubData, setGithubData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch GitHub data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch('/api/github');
        if (response.ok) {
          const data: GitHubUser = await response.json();
          setGithubData(data);
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchGitHubData();
  }, []);

  // Set items after GitHub data is loaded
  useEffect(() => {
    if (githubData) {
      const finalItems: any[] = [
        // Avatar
        {
          ...portfolioData.avatar,
          icon: getIconComponent('MdLocationOn')
        },
        // Skills
        {
          ...portfolioData.skills,
          icon: getIconComponent(portfolioData.skills.icon),
          skills: processSkills(portfolioData.skills.skills)
        },
        // Projects - grouped together for column 4
        ...portfolioData.projects.map(project => ({
          ...project,
          icon: getIconComponent(project.icon)
        })),
        // Social Media - GitHub with real data, others with static data from JSON
        {
          id: '8',
          type: 'contact',
          icon: getIconComponent('SiGithub'),
          title: 'GitHub',
          description: githubData.bio || 'Check out my code repositories.',
          span: 'col-span-1 row-span-1',
          username: githubData.login,
          repos: `${githubData.public_repos}+`,
          followers: `${githubData.followers}+`,
          avatar: githubData.avatar_url,
          theme: 'github',
          link: githubData.html_url,
        },
        // LinkedIn - static data from JSON
        {
          ...portfolioData.socialMedia.linkedin,
          icon: getIconComponent(portfolioData.socialMedia.linkedin.icon)
        },
        // X (Twitter) - static data from JSON
        {
          ...portfolioData.socialMedia.twitter,
          icon: getIconComponent(portfolioData.socialMedia.twitter.icon)
        },
        // Certifications
        {
          ...portfolioData.certifications,
          icon: getIconComponent(portfolioData.certifications.icon)
        },
        // Contact form - moved up
        {
          ...portfolioData.contactForm,
          icon: getIconComponent(portfolioData.contactForm.icon)
        },
        // Timeline - moved down
        {
          ...portfolioData.timeline,
          icon: getIconComponent(portfolioData.timeline.icon)
        },
        // Map
        portfolioData.map
      ];

      setItems(finalItems);
      setLoading(false);
    }
  }, [githubData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return <MasonryGrid items={items} />;
}
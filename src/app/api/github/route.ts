import { NextRequest, NextResponse } from 'next/server';

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

export async function GET() {
  try {
    const response = await fetch('https://api.github.com/users/tahiru0', {
      headers: {
        'User-Agent': 'Portfolio-App/1.0',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: GitHubUser = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
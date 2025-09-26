'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { IconType } from 'react-icons';
import { MdLocationOn } from 'react-icons/md';
import {
  SiJavascript,
  SiReact,
  SiPython,
  SiNodedotjs,
  SiMongodb,
  SiAmazon
} from 'react-icons/si';

// Muuri will be loaded dynamically inside a client-only effect to avoid SSR issues.

interface PortfolioItem {
  id: string;
  type: string;
  icon?: IconType;
  title: string;
  description: string;
  image?: string;
  images?: string[];
  tags?: string[];
  level?: number;
  color?: string;
  email?: string;
  availability?: string;
  certifications?: string[];
  username?: string;
  followers?: string;
  repos?: string;
  client?: string;
  rating?: number;
  stats?: { label: string; value: string }[];
  events?: { year: string; event: string }[];
  location?: string;
  timezone?: string;
  languages?: string[];
  date?: string;
  readTime?: string;
  link?: string;
  skills?: { name: string; level: number; color: string; description: string; icon?: IconType }[];
  role?: string;
  embedUrl?: string;
  theme?: string;
  backgroundColor?: string;
  hoverColor?: string;
  borderColor?: string;
  textColor?: string;
  iconColor?: string;
  avatar?: string;
  liveUrl?: string;
  sourceUrl?: string;
}

interface MasonryGridProps {
  items: PortfolioItem[];
}

export default function MasonryGrid({ items }: MasonryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const muuriRef = useRef<any>(null);
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { subject, message } = formData;
    const mailtoLink = `mailto:${items.find(item => item.type === 'contact-form')?.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  useEffect(() => {
    // Only run Muuri initialization on the client to avoid SSR evaluation
    if (typeof window === 'undefined') return;

    if (gridRef.current && !muuriRef.current) {
      // Provide a synchronous cleanup function reference which will be set by the async init
      let cleanup = () => {};

      (async () => {
  // Lazy-load Muuri only on client
  const mod = await import('muuri');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MuuriConstructor: any = mod && (mod.default || mod);

        // Check mobile
        const isMobile = window.innerWidth <= 640;

        muuriRef.current = new MuuriConstructor(gridRef.current, {
          items: '.item',
          dragEnabled: !isMobile, // Disable drag on mobile
          dragSort: !isMobile, // Disable drag sort on mobile
          dragContainer: document.body,
          dragRelease: {
            duration: 400,
            easing: 'ease-out',
          },
          layout: {
            fillGaps: true,
            horizontal: false,
            alignRight: false,
            alignBottom: false,
            rounding: false,
          },
          layoutOnResize: true,
          layoutOnInit: true,
          layoutDuration: 300,
          layoutEasing: 'ease-out',
          dragSortPredicate: {
            threshold: 50,
            action: 'move',
            migrateAction: 'move',
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dragStartPredicate: function (item: any, event: any) {
            // Don't allow dragging if the target has no-drag class or is a form element or iframe
            const target = event.target;
            if (target.closest('.no-drag') ||
                target.tagName === 'IFRAME' ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'SELECT' ||
                target.tagName === 'LABEL' ||
                target.closest('input') ||
                target.closest('textarea') ||
                target.closest('button') ||
                target.closest('select') ||
                target.closest('label') ||
                target.closest('iframe')) {
              return false;
            }

            // Allow dragging from drag-handle elements
            if (target.closest('.drag-handle')) {
              return MuuriConstructor?.ItemDrag.defaultStartPredicate(item, event, {
                distance: 0,
                delay: 0
              });
            }

            // Use default predicate but with higher delay to distinguish click from drag
            return MuuriConstructor?.ItemDrag.defaultStartPredicate(item, event, {
              distance: 10,
              delay: 0
            });
          },
        });

        // Handle window resize for responsive layout
        const handleResize = () => {
          if (muuriRef.current) {
            muuriRef.current.refreshItems();
            muuriRef.current.layout();
          }
        };

        // Handle drag events to refresh layout
        const handleDragEnd = () => {
          if (muuriRef.current) {
            setTimeout(() => {
              muuriRef.current?.refreshItems().layout();
            }, 100);
          }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        if (muuriRef.current) {
          muuriRef.current.on('dragEnd', handleDragEnd);
        }

        cleanup = () => {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('orientationchange', handleResize);
          if (muuriRef.current) {
            muuriRef.current.off('dragEnd', handleDragEnd);
            muuriRef.current.destroy();
            muuriRef.current = null;
          }
        };
      })();

      return () => {
        // Call the cleanup if it was set by the async initializer
        try { cleanup(); } catch { /* ignore cleanup errors during unmount */ }
      };
    }
  }, []);

  const renderItemContent = (item: PortfolioItem) => {
    const IconComponent = item.icon;

    switch (item.type) {
      case 'avatar':
        return (
          <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
            {item.image && (
              <div className="relative w-32 h-32 mb-4 mx-auto">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover border-4 border-gray-200 shadow-lg"
                />
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h2>
            <p className="text-lg text-gray-700 font-medium mb-2">{item.role}</p>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex items-center text-gray-500 mb-4">
              <MdLocationOn className="w-4 h-4 mr-1" />
              <span className="text-sm">{item.location}</span>
            </div>
            <button
              onClick={() => window.open('/cv.pdf', '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Download CV
            </button>
          </div>
        );

      case 'project':
        const images = item.images || (item.image ? [item.image] : []);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [currentImageIndex, setCurrentImageIndex] = useState(0);

        // Auto slideshow
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (images.length <= 1) return;

          const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
          }, 3000); // Change image every 3 seconds

          return () => clearInterval(interval);
        }, [images.length]);

        const nextImage = (e: React.MouseEvent) => {
          e.stopPropagation();
          setCurrentImageIndex((prev) => (prev + 1) % images.length);
        };

        const prevImage = (e: React.MouseEvent) => {
          e.stopPropagation();
          setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        };

        const handleCardClick = (e: React.MouseEvent) => {
          // Only open link if not clicking on navigation elements
          if (!e.target || !(e.target as HTMLElement).closest('.carousel-nav, .carousel-dots, .action-buttons')) {
            if (item.liveUrl) {
              window.open(item.liveUrl, '_blank');
            }
          }
        };

        return (
          <div className="relative h-full min-h-[200px] group cursor-pointer overflow-hidden hover:scale-105 transition-all duration-500 hover:z-10 hover:shadow-2xl" onClick={handleCardClick}>
            {/* Main Image */}
            {images.length > 0 && (
              <Image
                src={images[currentImageIndex]}
                alt={item.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
            )}

            {/* Auto slideshow indicator */}
            {images.length > 1 && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                {currentImageIndex + 1}/{images.length}
              </div>
            )}

            {/* Navigation Arrows with gradient background */}
            {images.length > 1 && (
              <>
                {/* Left gradient and arrow */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-start pl-2 z-50">
                  <button
                    onClick={prevImage}
                    className="carousel-nav text-white text-2xl hover:text-yellow-300 transition-colors duration-200 hover:scale-110"
                  >
                    ‹
                  </button>
                </div>

                {/* Right gradient and arrow */}
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-end pr-2 z-50">
                  <button
                    onClick={nextImage}
                    className="carousel-nav text-white text-2xl hover:text-yellow-300 transition-colors duration-200 hover:scale-110"
                  >
                    ›
                  </button>
                </div>
              </>
            )}

            {/* Dots Indicator */}
            {images.length > 1 && (
              <div className="carousel-dots absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-200 hover:scale-125 ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="action-buttons absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
              {item.liveUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.liveUrl, '_blank');
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-full transition-colors duration-200 hover:scale-105"
                >
                  See Live
                </button>
              )}
              {item.sourceUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.sourceUrl, '_blank');
                  }}
                  className="bg-gray-800 hover:bg-gray-900 text-white text-sm px-3 py-1 rounded-full transition-colors duration-200 hover:scale-105"
                >
                  Source Code
                </button>
              )}
            </div>

            {/* Remove overlay completely - no dark overlay on hover */}

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-yellow-300 transition-colors">{item.title}</h3>
              <p className="text-gray-200 text-sm mb-3 group-hover:text-white transition-colors">{item.description}</p>
              {item.tags && (
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded hover:bg-opacity-90 transition-all duration-200 hover:scale-105">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'skill':
        return (
          <div className="p-6 h-full flex flex-col justify-center">
            <div className="flex items-center mb-4">
              {IconComponent && <IconComponent className="w-8 h-8 text-gray-600 mr-3" />}
              <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            <div className="w-full bg-gray-200 h-2 mb-2">
              <div
                className={`h-2 ${item.color || 'bg-gray-400'}`}
                style={{ width: `${item.level}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-500">{item.level}%</span>
          </div>
        );

      case 'skills':
        return (
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center mb-6">
              {IconComponent && <IconComponent className="w-8 h-8 text-gray-600 mr-3" />}
              <h3 className="font-semibold text-xl text-gray-900">{item.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-6">{item.description}</p>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-wrap gap-3">
                {item.skills?.map((skill, index) => {
                  const iconMap: Record<string, IconType> = {
                    'SiJavascript': SiJavascript,
                    'SiReact': SiReact,
                    'SiPython': SiPython,
                    'SiNodedotjs': SiNodedotjs,
                    'SiMongodb': SiMongodb,
                    'SiAmazon': SiAmazon
                  };

                  const SkillIcon = iconMap[String(skill.icon)];

                  return (
                    <div key={index} className="flex items-center px-4 py-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:shadow-md transition-all duration-300">
                      {SkillIcon && <SkillIcon className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />}
                      <span className="font-medium text-gray-900 text-sm whitespace-nowrap">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'contact':
        // Check if this is a social media contact (has theme) or email contact (has email)
        if (item.theme) {
          // Social media contact
          const getThemeStyles = (theme?: string) => {
            switch (theme) {
              case 'github':
                return {
                  normal: 'bg-gray-50 hover:bg-gray-900 border-gray-200 hover:border-gray-800',
                  textNormal: 'text-gray-900',
                  textHover: 'group-hover:text-white',
                  iconNormal: 'text-gray-600',
                  iconHover: 'group-hover:text-white'
                };
              case 'linkedin':
                return {
                  normal: 'bg-blue-50 hover:bg-blue-600 border-blue-200 hover:border-blue-700',
                  textNormal: 'text-gray-900',
                  textHover: 'group-hover:text-white',
                  iconNormal: 'text-gray-600',
                  iconHover: 'group-hover:text-white'
                };
              case 'twitter':
                return {
                  normal: 'bg-sky-50 hover:bg-black border-sky-200 hover:border-gray-800',
                  textNormal: 'text-gray-900',
                  textHover: 'group-hover:text-white',
                  iconNormal: 'text-gray-600',
                  iconHover: 'group-hover:text-white'
                };
              default:
                return {
                  normal: 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300',
                  textNormal: 'text-gray-900',
                  textHover: 'group-hover:text-gray-800',
                  iconNormal: 'text-gray-600',
                  iconHover: 'group-hover:text-gray-800'
                };
            }
          };

          const themeStyles = getThemeStyles(item.theme);

          return (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative block p-6 h-full flex flex-col justify-center text-center transition-all duration-300 group ${themeStyles.normal} hover:no-underline`}
            >
              {/* Default state: icon, title, and basic info */}
              <div className="group-hover:opacity-0 transition-opacity duration-300">
                {IconComponent && <IconComponent className={`w-12 h-12 mx-auto mb-4 transition-all duration-300 ${themeStyles.iconNormal} ${themeStyles.iconHover} group-hover:scale-110`} />}
                <h3 className={`font-semibold text-lg mb-2 transition-colors duration-300 ${themeStyles.textNormal} ${themeStyles.textHover}`}>{item.title}</h3>
                <p className={`text-sm transition-colors duration-300 ${themeStyles.textNormal} ${themeStyles.textHover}`}>{item.description}</p>
              </div>

              {/* Hover state: centered avatar and details */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.avatar && (
                  <Image
                    src={item.avatar}
                    alt={`${item.title} avatar`}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full mb-3 border-2 border-white shadow-lg"
                  />
                )}
                <div className="text-center">
                  <p className={`font-medium text-sm mb-1 transition-colors duration-300 ${themeStyles.textNormal} ${themeStyles.textHover}`}>{item.username}</p>
                  <p className={`text-green-600 text-xs mb-1 transition-colors duration-300 group-hover:text-green-300`}>{item.followers} followers</p>
                  {item.repos && <p className={`text-gray-500 text-xs transition-colors duration-300 group-hover:text-gray-300`}>{item.repos} repositories</p>}
                </div>
              </div>
            </a>
          );
        } else {
          // Email contact
          return (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-6 h-full flex flex-col justify-center text-center hover:bg-gray-50 transition-colors duration-300 group hover:no-underline no-drag`}
            >
              {IconComponent && <IconComponent className="w-12 h-12 mx-auto mb-4 text-gray-600 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300" />}
              <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700 transition-colors">{item.description}</p>
              {item.email && (
                <div className="space-y-2">
                  <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{item.email}</p>
                  <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Click to send email</p>
                </div>
              )}
            </a>
          );
        }

      case 'contact-form':
        return (
          <div className="p-6 h-full flex flex-col overflow-hidden">
            <div className="flex items-center mb-4">
              {IconComponent && <IconComponent className="w-8 h-8 text-gray-600 mr-3" />}
              <h3 className="font-semibold text-xl text-gray-900">{item.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-3 overflow-hidden">
              <div className="flex-shrink-0">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="flex-1 min-h-0">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full h-full px-3 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                />
              </div>
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 transition-colors duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        );

      case 'certifications':
        return (
          <div className="p-6 h-full flex flex-col justify-center hover:bg-gray-50 transition-colors duration-300 group">
            {IconComponent && <IconComponent className="w-8 h-8 text-gray-600 mb-3 group-hover:text-yellow-500 group-hover:scale-110 transition-all duration-300" />}
            <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-yellow-600 transition-colors">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700 transition-colors">{item.description}</p>
            <div className="space-y-2">
              {item.certifications?.map((cert, index) => (
                <div key={index} className="flex items-center group/cert">
                  <div className="w-2 h-2 bg-gray-400 mr-2 group-hover/cert:bg-yellow-400 transition-colors duration-200"></div>
                  <span className="text-sm text-gray-700 group-hover/cert:text-gray-900 transition-colors">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="p-6 h-full">
            <div className="flex items-center mb-6">
              {IconComponent && <IconComponent className="w-8 h-8 text-gray-600 mr-3" />}
              <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-6">{item.description}</p>
            <div className="space-y-4 overflow-y-auto max-h-64">
              {item.events?.map((event, index) => (
                <div key={index} className="flex items-start animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex-shrink-0 w-3 h-3 bg-gray-400 mt-2 mr-4"></div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 mr-2">{event.year}</span>
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                    <p className="text-sm text-gray-700">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="p-6 h-full flex flex-col justify-center text-center">
            {IconComponent && <IconComponent className="w-8 h-8 text-gray-600 mb-3" />}
            <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            <div className="space-y-2">
              <p className="text-gray-700 font-medium">{item.location}</p>
              <p className="text-sm text-gray-500">{item.timezone}</p>
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {item.languages?.map((lang, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'map':
        return (
          <div className="h-full flex flex-col overflow-hidden relative group cursor-pointer">
            <div className="flex-shrink-0 drag-handle">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 p-4 pb-0">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4 px-4">{item.description}</p>
            </div>

            {/* Drag handle bar */}
            <div className="drag-handle h-2 bg-gray-200 hover:bg-gray-300 transition-colors cursor-move relative z-50">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gray-400"></div>
            </div>
            <div className="flex-1 min-h-0 relative">
              <iframe
                src={item.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full relative z-10"
              ></iframe>

              {/* Click overlay to open map in new tab - only active on quick clicks */}
              <div
                className="absolute inset-0 bg-transparent cursor-pointer z-20 pointer-events-none"
                onMouseDown={(e) => {
                  // Enable click overlay only for quick clicks, not drags
                  const overlay = e.currentTarget as HTMLElement;
                  overlay.style.pointerEvents = 'auto';

                  // Reset after a short delay
                  setTimeout(() => {
                    overlay.style.pointerEvents = 'none';
                  }, 200);
                }}
                onClick={() => {
                  if (item.link) {
                    window.open(item.link, '_blank');
                  }
                }}
                title="Click to open map in new tab"
              />
            </div>
          </div>
        );

    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div ref={gridRef} className="grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="item bg-white border border-gray-800 overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {renderItemContent(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
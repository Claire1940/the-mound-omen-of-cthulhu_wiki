"use client";

import { Suspense, lazy } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Brain,
  Calendar,
  Check,
  Compass,
  Cpu,
  Crosshair,
  Droplet,
  EyeOff,
  Flame,
  Gauge,
  Gem,
  Ghost,
  Lightbulb,
  Map,
  MessagesSquare,
  PersonStanding,
  Radio,
  ScrollText,
  Skull,
  Sparkles,
  Sword,
  Swords,
  Target,
  Trees,
  UserX,
  Users,
  X,
} from "lucide-react";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} animate-pulse rounded-xl border border-border bg-white/5`} />
);

// Tools Grid 卡片图标映射（与下方 8 个模块锚点一一对应）
const CARD_ICONS: Record<string, LucideIcon> = {
  "release-date-platforms": Calendar,
  "beginner-guide": Compass,
  "best-weapons": Swords,
  "sanity-guide": Brain,
  "coop-crossplay": Users,
  "contracts-extraction": ScrollText,
  "monsters-bestiary": Skull,
  "system-requirements": Cpu,
};

// 武器/装备卡片各自不同的图标
const WEAPON_ICONS: LucideIcon[] = [
  Target,
  Lightbulb,
  Crosshair,
  Sword,
  Gem,
  Flame,
  Users,
  Sparkles,
];

// 理智卡片各自不同的图标
const SANITY_ICONS: LucideIcon[] = [
  Gauge,
  Droplet,
  Bell,
  Users,
  UserX,
  Map,
  MessagesSquare,
  Radio,
  Brain,
];

// 怪物卡片各自不同的图标
const MONSTER_ICONS: LucideIcon[] = [
  Skull,
  PersonStanding,
  Users,
  EyeOff,
  Ghost,
  Trees,
];

// 模块级标题区（eyebrow 徽章 + 图标 + 标题 + intro）
function ModuleHeader({
  eyebrow,
  title,
  intro,
  Icon,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  Icon: LucideIcon;
}) {
  return (
    <div className="scroll-reveal mb-8 text-center md:mb-12">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-3 py-1.5">
        <Icon className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
        <span className="text-xs font-medium uppercase tracking-wider md:text-sm">
          {eyebrow}
        </span>
      </div>
      <h2 className="mb-3 text-3xl font-bold leading-tight md:mb-4 md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg">
        {intro}
      </p>
    </div>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.the-mound-omen-of-cthulhu.wiki";
  const mobileBannerAd = getPreferredMobileBannerSelection();

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "The Mound: Omen of Cthulhu Wiki",
        description:
          "Complete The Mound: Omen of Cthulhu Wiki covering expeditions, weapons, sanity, contracts, treasures, enemies, maps, and survival tips for the Lovecraftian co-op horror.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "The Mound: Omen of Cthulhu - Lovecraftian Co-op Horror",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "The Mound: Omen of Cthulhu Wiki",
        alternateName: "The Mound: Omen of Cthulhu",
        url: siteUrl,
        description:
          "Complete The Mound: Omen of Cthulhu Wiki resource hub for expeditions, weapons, sanity, contracts, enemies, and survival guides",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "The Mound: Omen of Cthulhu Wiki - Lovecraftian Co-op Horror",
        },
        sameAs: [
          "https://store.steampowered.com/app/2569760/The_Mound_Omen_of_Cthulhu/",
          "https://discord.gg/dcGxnjt",
          "https://www.reddit.com/r/ACETeam/",
          "https://x.com/theACETeam",
        ],
      },
      {
        "@type": "VideoGame",
        name: "The Mound: Omen of Cthulhu",
        gamePlatform: ["PC", "PlayStation 5", "Xbox Series X|S"],
        applicationCategory: "Game",
        genre: ["Horror", "Survival", "Co-op", "Adventure"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 4,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://store.steampowered.com/app/2569760/The_Mound_Omen_of_Cthulhu/",
        },
      },
      {
        "@type": "VideoObject",
        name: "The Mound: Omen of Cthulhu | Release Date Trailer",
        description:
          "Official The Mound: Omen of Cthulhu Release Date Trailer from publisher Nacon.",
        uploadDate: "2026-07-15",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/YR4pOLn0ydg",
        url: "https://www.youtube.com/watch?v=YR4pOLn0ydg",
      },
    ],
  };

  // 武器 tier 徽章样式（仅使用主题色 + 中性色，无硬编码颜色）
  const tierBadgeClass = (tier: string): string => {
    switch (tier) {
      case "S":
        return "bg-[hsl(var(--nav-theme))] text-white";
      case "A":
        return "bg-[hsl(var(--nav-theme)/0.7)] text-white";
      case "B":
        return "bg-[hsl(var(--nav-theme)/0.25)] text-[hsl(var(--nav-theme-light))]";
      case "Team":
        return "border border-[hsl(var(--nav-theme)/0.4)] bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]";
      default:
        return "border border-border bg-white/5 text-muted-foreground";
    }
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* ============ Hero Section ============ */}
      <section className="relative overflow-hidden px-4 pb-14 pt-24 md:pb-20 md:pt-32">
        <div className="container mx-auto max-w-6xl">
          <div className="scroll-reveal mb-8 text-center">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-3 py-1.5 md:mb-6 md:px-4 md:py-2">
              <Sparkles className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-medium md:text-sm">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold leading-[1.05] sm:text-5xl md:mb-6 md:text-7xl">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("beginner-guide")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(var(--nav-theme))] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[hsl(var(--nav-theme)/0.9)] md:px-8 md:py-4 md:text-lg"
              >
                <BookOpen className="h-5 w-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://store.steampowered.com/app/2569760/The_Mound_Omen_of_Cthulhu/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-base font-semibold transition-colors hover:bg-white/10 md:px-8 md:py-4 md:text-lg"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* ============ Video Section（IntersectionObserver 自动播放）============ */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="YR4pOLn0ydg"
              title="The Mound: Omen of Cthulhu | Release Date Trailer"
            />
          </div>
        </div>
      </section>

      {/* ============ Tools Grid - 8 Navigation Cards（视频区之后、Latest Updates 之前）============ */}
      <section className="bg-white/[0.02] px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="scroll-reveal mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-3xl font-bold md:mb-4 md:text-5xl">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              const Icon = CARD_ICONS[card.id] ?? Sparkles;
              return (
                <a
                  key={card.id}
                  href={`#${card.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(card.id);
                  }}
                  className="scroll-reveal group block cursor-pointer rounded-xl border border-border bg-card p-4 text-left transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)] md:p-6"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                    <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6" />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold leading-snug md:text-base">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 2: 首屏内容之后 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端方形 / 桌面端横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* ============ Latest Updates（保留，不可删除）============ */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      {/* ============ Module 1: Release Date, Platforms and Editions ============ */}
      <section
        id="release-date-platforms"
        className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.releaseDatePlatforms.eyebrow}
            title={t.modules.releaseDatePlatforms.title}
            intro={t.modules.releaseDatePlatforms.intro}
            Icon={Calendar}
          />
          <div className="scroll-reveal overflow-hidden rounded-xl border border-border">
            {/* 表头 */}
            <div className="hidden grid-cols-[1.5fr_1fr_1fr] bg-[hsl(var(--nav-theme)/0.15)] md:grid">
              <div className="p-4 text-xs font-semibold uppercase tracking-wide">
                Feature
              </div>
              <div className="border-l border-border p-4 text-xs font-semibold uppercase tracking-wide">
                Standard Edition
              </div>
              <div className="border-l border-border p-4 text-xs font-semibold uppercase tracking-wide">
                Deluxe Edition
              </div>
            </div>
            {t.modules.releaseDatePlatforms.items.map((row: any, i: number) => (
              <div
                key={i}
                className={`grid grid-cols-1 border-t border-border md:grid-cols-[1.5fr_1fr_1fr] ${
                  i % 2 === 1 ? "bg-white/[0.02]" : ""
                }`}
              >
                <div className="p-4">
                  <div className="font-semibold">{row.feature}</div>
                  <div className="mt-1 text-xs text-muted-foreground md:max-w-xs">
                    {row.details}
                  </div>
                </div>
                <div className="border-t border-border/50 p-4 md:border-l md:border-t-0">
                  <span className="mb-1 block text-xs text-muted-foreground md:hidden">
                    Standard
                  </span>
                  <span className="text-sm">{row.standard}</span>
                </div>
                <div className="border-t border-border/50 bg-[hsl(var(--nav-theme)/0.05)] p-4 md:border-l md:border-t-0">
                  <span className="mb-1 block text-xs text-muted-foreground md:hidden">
                    Deluxe
                  </span>
                  <span className="text-sm font-medium">{row.deluxe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 4: 模块阅读停顿 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* ============ Module 2: Beginner Guide ============ */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.beginnerGuide.eyebrow}
            title={t.modules.beginnerGuide.title}
            intro={t.modules.beginnerGuide.intro}
            Icon={Compass}
          />
          <div className="scroll-reveal space-y-3 md:space-y-4">
            {t.modules.beginnerGuide.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 rounded-xl border border-border bg-white/5 p-4 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)] md:gap-4 md:p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)] md:h-12 md:w-12">
                  <span className="text-base font-bold text-[hsl(var(--nav-theme-light))] md:text-xl">
                    {index + 1}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="mb-1.5 text-lg font-bold md:mb-2 md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground md:mb-4 md:text-base">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.priorities.map((p: string, pi: number) => (
                      <li key={pi} className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                        <span className="text-sm text-muted-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Module 3: Best Weapons and Equipment（Tier Grid）============ */}
      <section
        id="best-weapons"
        className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.bestWeapons.eyebrow}
            title={t.modules.bestWeapons.title}
            intro={t.modules.bestWeapons.intro}
            Icon={Swords}
          />
          <div className="scroll-reveal grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.modules.bestWeapons.items.map((item: any, index: number) => {
              const Icon = WEAPON_ICONS[index] ?? Target;
              return (
                <div
                  key={index}
                  className="flex flex-col rounded-xl border border-border bg-white/5 p-5 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)] md:p-6"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                        <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                      </span>
                      <h3 className="font-bold leading-tight">{item.name}</h3>
                    </div>
                    <span
                      className={`flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${tierBadgeClass(
                        item.tier,
                      )}`}
                    >
                      {item.tier}
                    </span>
                  </div>
                  <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                    {item.category}
                  </p>
                  <p className="mb-4 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Best for: </span>
                    {item.bestFor}
                  </p>
                  <ul className="mb-3 space-y-1.5">
                    {item.strengths.map((s: string, si: number) => (
                      <li key={si} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                        <span className="text-sm text-muted-foreground">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mb-4 space-y-1.5">
                    {item.weaknesses.map((w: string, wi: number) => (
                      <li key={wi} className="flex items-start gap-2">
                        <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground/70" />
                        <span className="text-sm text-muted-foreground">{w}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto rounded-lg border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.07)] p-3">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                        Role:{" "}
                      </span>
                      {item.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ Module 4: Sanity and Hallucinations（Card List）============ */}
      <section id="sanity-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.sanityGuide.eyebrow}
            title={t.modules.sanityGuide.title}
            intro={t.modules.sanityGuide.intro}
            Icon={Brain}
          />
          <div className="scroll-reveal grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.modules.sanityGuide.cards.map((card: any, index: number) => {
              const Icon = SANITY_ICONS[index] ?? Brain;
              return (
                <div
                  key={index}
                  className="flex flex-col rounded-xl border border-border bg-white/5 p-5 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)] md:p-6"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                      <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                    </span>
                    <h3 className="font-bold leading-tight">{card.title}</h3>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">{card.danger}</p>
                  <ul className="mb-4 space-y-1.5">
                    {card.effects.map((e: string, ei: number) => (
                      <li key={ei} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[hsl(var(--nav-theme-light))]" />
                        <span className="text-sm text-muted-foreground">{e}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto rounded-lg border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.07)] p-3">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                        Response:{" "}
                      </span>
                      {card.response}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* ============ Module 5: Co-op, Solo and Crossplay（Table）============ */}
      <section
        id="coop-crossplay"
        className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.coopCrossplay.eyebrow}
            title={t.modules.coopCrossplay.title}
            intro={t.modules.coopCrossplay.intro}
            Icon={Users}
          />
          <div className="scroll-reveal overflow-hidden rounded-xl border border-border">
            <div className="hidden grid-cols-[1fr_1.1fr_1.4fr] bg-[hsl(var(--nav-theme)/0.15)] md:grid">
              <div className="p-4 text-xs font-semibold uppercase tracking-wide">
                Feature
              </div>
              <div className="border-l border-border p-4 text-xs font-semibold uppercase tracking-wide">
                Support
              </div>
              <div className="border-l border-border p-4 text-xs font-semibold uppercase tracking-wide">
                Recommended Use
              </div>
            </div>
            {t.modules.coopCrossplay.items.map((row: any, i: number) => (
              <div
                key={i}
                className={`grid grid-cols-1 border-t border-border md:grid-cols-[1fr_1.1fr_1.4fr] ${
                  i % 2 === 1 ? "bg-white/[0.02]" : ""
                }`}
              >
                <div className="p-4">
                  <span className="mb-1 block text-xs text-muted-foreground md:hidden">
                    Feature
                  </span>
                  <span className="font-semibold">{row.feature}</span>
                </div>
                <div className="border-t border-border/50 p-4 md:border-l md:border-t-0">
                  <span className="mb-1 block text-xs text-muted-foreground md:hidden">
                    Support
                  </span>
                  <span className="text-sm text-[hsl(var(--nav-theme-light))]">
                    {row.support}
                  </span>
                </div>
                <div className="border-t border-border/50 p-4 md:border-l md:border-t-0">
                  <span className="mb-1 block text-xs text-muted-foreground md:hidden">
                    Recommended Use
                  </span>
                  <span className="text-sm text-muted-foreground">{row.use}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Module 6: Contracts, Treasure and Extraction（Steps）============ */}
      <section id="contracts-extraction" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.contractsExtraction.eyebrow}
            title={t.modules.contractsExtraction.title}
            intro={t.modules.contractsExtraction.intro}
            Icon={ScrollText}
          />
          <div className="scroll-reveal relative space-y-4 border-l-2 border-[hsl(var(--nav-theme)/0.3)] pl-6">
            {t.modules.contractsExtraction.steps.map((step: any, index: number) => (
              <div key={index} className="relative">
                <div className="absolute -left-[1.9rem] flex h-8 w-8 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-sm font-bold text-[hsl(var(--nav-theme-light))]">
                    {index + 1}
                  </span>
                </div>
                <div className="rounded-xl border border-border bg-white/5 p-5 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]">
                  <h3 className="mb-3 text-lg font-bold md:text-xl">{step.title}</h3>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="rounded-lg bg-white/[0.03] p-3">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))]">
                        Objective
                      </p>
                      <p className="text-sm text-muted-foreground">{step.objective}</p>
                    </div>
                    <div className="rounded-lg bg-white/[0.03] p-3">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))]">
                        Action
                      </p>
                      <p className="text-sm text-muted-foreground">{step.action}</p>
                    </div>
                    <div className="rounded-lg border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.07)] p-3">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))]">
                        Risk Control
                      </p>
                      <p className="text-sm text-muted-foreground">{step.risk}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位: 模块中段 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* ============ Module 7: Monsters and Bestiary（Card List）============ */}
      <section
        id="monsters-bestiary"
        className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.monstersBestiary.eyebrow}
            title={t.modules.monstersBestiary.title}
            intro={t.modules.monstersBestiary.intro}
            Icon={Skull}
          />
          <div className="scroll-reveal grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.modules.monstersBestiary.cards.map((card: any, index: number) => {
              const Icon = MONSTER_ICONS[index] ?? Skull;
              return (
                <div
                  key={index}
                  className="flex flex-col rounded-xl border border-border bg-white/5 p-5 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)] md:p-6"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                      <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                    </span>
                    <h3 className="font-bold leading-tight">{card.name}</h3>
                  </div>
                  <span className="mb-3 inline-block w-fit rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2.5 py-1 text-xs text-[hsl(var(--nav-theme-light))]">
                    {card.type}
                  </span>
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Behavior: </span>
                    {card.behavior}
                  </p>
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Warning: </span>
                    {card.warning}
                  </p>
                  <div className="mt-auto rounded-lg border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.07)] p-3">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                        Counter:{" "}
                      </span>
                      {card.counter}
                    </p>
                  </div>
                  {card.rule ? (
                    <p className="mt-2 text-xs italic text-muted-foreground">
                      {card.rule}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ Module 8: System Requirements and Performance（Table）============ */}
      <section id="system-requirements" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.systemRequirements.eyebrow}
            title={t.modules.systemRequirements.title}
            intro={t.modules.systemRequirements.intro}
            Icon={Cpu}
          />
          <div className="scroll-reveal overflow-hidden rounded-xl border border-border">
            <div className="hidden grid-cols-[0.9fr_1fr_1.1fr] bg-[hsl(var(--nav-theme)/0.15)] md:grid">
              <div className="p-4 text-xs font-semibold uppercase tracking-wide">
                Component
              </div>
              <div className="border-l border-border p-4 text-xs font-semibold uppercase tracking-wide">
                Minimum
              </div>
              <div className="border-l border-border p-4 text-xs font-semibold uppercase tracking-wide">
                Recommended
              </div>
            </div>
            {t.modules.systemRequirements.items.map((row: any, i: number) => (
              <div
                key={i}
                className={`border-t border-border ${i % 2 === 1 ? "bg-white/[0.02]" : ""}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1fr_1.1fr]">
                  <div className="p-4">
                    <span className="mb-1 block text-xs text-muted-foreground md:hidden">
                      Component
                    </span>
                    <span className="font-semibold">{row.category}</span>
                  </div>
                  <div className="border-t border-border/50 p-4 md:border-l md:border-t-0">
                    <span className="mb-1 block text-xs text-muted-foreground md:hidden">
                      Minimum
                    </span>
                    <span className="text-sm text-muted-foreground">{row.minimum}</span>
                  </div>
                  <div className="border-t border-border/50 bg-[hsl(var(--nav-theme)/0.05)] p-4 md:border-l md:border-t-0">
                    <span className="mb-1 block text-xs text-muted-foreground md:hidden">
                      Recommended
                    </span>
                    <span className="text-sm font-medium">{row.recommended}</span>
                  </div>
                </div>
                <div className="border-t border-border/50 bg-white/[0.02] px-4 py-3">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                      Tip:{" "}
                    </span>
                    {row.priority}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ Section ============ */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* ============ CTA Section ============ */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner (final) */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* ============ Footer ============ */}
      <footer className="border-t border-border bg-white/[0.02]">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div>
              <h3 className="mb-4 text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            {/* Community - External Links */}
            <div>
              <h4 className="mb-4 font-semibold">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.gg/dcGxnjt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/theACETeam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://steamcommunity.com/app/2569760"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://store.steampowered.com/app/2569760/The_Mound_Omen_of_Cthulhu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes */}
            <div>
              <h4 className="mb-4 font-semibold">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href={locale === "en" ? "/about" : `/${locale}/about`}
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "en"
                        ? "/privacy-policy"
                        : `/${locale}/privacy-policy`
                    }
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "en" ? "/terms-of-service" : `/${locale}/terms-of-service`
                    }
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href={locale === "en" ? "/copyright" : `/${locale}/copyright`}
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="mb-2 text-sm text-muted-foreground">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

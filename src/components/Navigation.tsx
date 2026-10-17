"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { sectionIcons } from "@/lib/sectionIcons"
import { SearchOverlay } from "@/components/SearchOverlay"

interface NavItem {
  href: string
  label: string
}

const westerosLinks: NavItem[] = [
  { href: "/greathouses", label: "Great Houses" },
  { href: "/locations", label: "Locations" },
  { href: "/map", label: "Interactive Map" },
  { href: "/organizations", label: "Organizations" },
]

const primaryLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/dragons", label: "Dragons" },
  { href: "/characters", label: "Characters" },
  { href: "/timeline", label: "Timeline" },
  { href: "/races", label: "Races" },
  { href: "/magic", label: "Magic" },
]

const mobileGroups: { title: string; links: NavItem[] }[] = [
  { title: "Realm", links: [{ href: "/", label: "Home" }, ...westerosLinks] },
  {
    title: "The Dance",
    links: [
      { href: "/dragons", label: "Dragons" },
      { href: "/characters", label: "Characters" },
      { href: "/timeline", label: "Timeline" },
    ],
  },
  {
    title: "Lore",
    links: [
      { href: "/races", label: "Races" },
      { href: "/magic", label: "Magic" },
      { href: "/lobby", label: "Gallery" },
    ],
  },
]

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen, searchOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)
  const westerosActive = westerosLinks.some((l) => isActive(l.href))

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-gold-primary/15 bg-ink/85 backdrop-blur-md shadow-lg shadow-black/40"
            : "border-b border-transparent bg-gradient-to-b from-black/70 to-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link
              href="/"
              className="group flex items-center gap-2 text-gold-primary transition-colors hover:text-gold-light"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gold-primary/30 bg-black/40 p-0.5" aria-hidden>
                <Image
                  src={sectionIcons.dragons}
                  alt=""
                  width={32}
                  height={32}
                  className="h-full w-full rounded-md object-contain"
                />
              </span>
              <span className="leading-none">
                <span className="block font-[family-name:var(--font-display)] text-sm font-bold tracking-[0.18em] md:text-base">
                  THE DANCE
                </span>
                <span className="block text-[9px] uppercase tracking-[0.42em] text-cream/50 group-hover:text-cream/80">
                  of the Dragons
                </span>
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center gap-0.5 lg:flex">
              {primaryLinks.slice(0, 1).map((link) => (
                <NavLink key={link.href} {...link} active={isActive(link.href)} />
              ))}

              <div
                className="relative"
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-expanded={menuOpen}
                  className={cn(
                    "relative flex items-center gap-1 px-3 py-2 text-sm transition-colors",
                    westerosActive || menuOpen
                      ? "text-gold-primary"
                      : "text-cream/80 hover:text-gold-primary"
                  )}
                >
                  Westeros
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform duration-300",
                      menuOpen && "rotate-180"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-gold-primary transition-all duration-300",
                      westerosActive || menuOpen ? "w-full" : "w-0"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full w-56 pt-2"
                    >
                      <div className="overflow-hidden rounded-xl border border-gold-primary/25 bg-ink/95 p-1.5 shadow-xl shadow-black/60 backdrop-blur-md">
                        {westerosLinks.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                              "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                              isActive(item.href)
                                ? "bg-gold-primary/15 text-gold-primary"
                                : "text-cream/75 hover:bg-gold-primary/10 hover:text-gold-primary"
                            )}
                          >
                            {item.label}
                            {item.href === "/map" && (
                              <Image
                                src={sectionIcons.map}
                                alt=""
                                width={20}
                                height={20}
                                className="h-5 w-5 shrink-0 rounded object-contain"
                              />
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {primaryLinks.slice(1).map((link) => (
                <NavLink key={link.href} {...link} active={isActive(link.href)} />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 rounded-full border border-gold-primary/30 bg-black/40 px-3 py-1.5 text-cream/70 transition-all hover:border-gold-primary/60 hover:text-gold-primary"
                aria-label="Search the archive"
              >
                <Search size={15} />
                <span className="hidden text-xs md:inline">Search</span>
                <kbd className="hidden rounded border border-gold-primary/30 px-1.5 py-0.5 text-[9px] uppercase tracking-widest md:inline">
                  ⌘K
                </kbd>
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="p-2 text-cream lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] border-l border-gold-primary/25 bg-ink/97 p-6 backdrop-blur-xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-gold-primary">
                  THE DANCE
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-cream transition-colors hover:text-gold-primary"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  setSearchOpen(true)
                }}
                className="mb-6 flex w-full items-center gap-2 rounded-full border border-gold-primary/30 px-4 py-2.5 text-left text-sm text-cream/60 transition-colors hover:border-gold-primary/60 hover:text-gold-primary"
              >
                <Search size={15} />
                Search the archive…
              </button>

              <div className="space-y-6 overflow-y-auto pb-8">
                {mobileGroups.map((group) => (
                  <div key={group.title}>
                    <p className="eyebrow mb-2">{group.title}</p>
                    <div className="flex flex-col">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "rounded-lg px-3 py-2.5 text-[15px] transition-all",
                            isActive(link.href)
                              ? "bg-gold-primary/15 text-gold-primary"
                              : "text-cream/75 hover:bg-gold-primary/10 hover:text-gold-primary"
                          )}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

function NavLink({
  href,
  label,
  active,
}: NavItem & { active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2 text-sm transition-colors",
        active ? "text-gold-primary" : "text-cream/80 hover:text-gold-primary"
      )}
    >
      {label}
      <span
        className={cn(
          "absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-gold-primary transition-all duration-300",
          active ? "w-full" : "w-0"
        )}
      />
    </Link>
  )
}

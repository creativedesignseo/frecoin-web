# Graph Report - frecoin-web-produccion  (2026-11-17)

## Corpus Check
- 182 files · ~84,418 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 4, .css 3, .example 1)

## Summary
- 1304 nodes · 2300 edges · 108 communities (81 shown, 27 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 62 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e83fe640`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cn
- sidebar.tsx
- carousel.tsx
- dependencies
- devDependencies
- HomePage.tsx
- panel/package.json
- compilerOptions
- with
- utils.ts
- compilerOptions
- components.json
- ServiceLayout.tsx
- services.ts
- HANDOFF.md — frecoin-web (verdad operativa)
- compilerOptions
- panel/src/App.tsx
- PLAN — Backoffice CMS para frecoin.es
- command.tsx
- GTM + GA4 measurement setup
- field.tsx
- src/App.tsx
- form.tsx
- menubar.tsx
- api.ts
- tasks/current.md — frecoin-web active task queue
- ref_lucide_react
- context-menu.tsx
- 2026-06-11 — Propuesta SEO FRECOIN + borradores Gmail + RGPD
- analytics.ts
- class-variance-authority
- db
- ref_react
- Verify SEO production handoff
- Arranque del proyecto SEO FRECOIN
- Accesos Google — correos enviados, Luis confirma por WhatsApp
- prerender.mjs
- Zona de servicio "Barcelona y Cataluña" + imágenes SAI profesionales
- Evaluar panel de auto-edición de contenido (CMS) — DIFERIDO
- Logo del panel + incidente de deploy + recuperación
- input-group.tsx
- item.tsx
- Backoffice CMS — autoedición de frecoin (React + PHP + MySQL)
- Usuarios.tsx
- CLAUDE.md — frecoin-web (Claude Code-specific)
- Contenido.tsx
- Remediación de la auditoría del backoffice
- breadcrumb.tsx
- chart.tsx
- Publicar el rediseño en producción (deploy manual)
- verify.sh
- tsconfig.json
- scripts
- drawer.tsx
- select.tsx
- navigation-menu.tsx
- progress/ — multi-step task journal
- Apply client copy and audit GBP
- Deploy customer confirmation email correction
- Servicios.tsx
- SEO implementation evidence for the client presentation
- empty.tsx
- popover.tsx
- Trabajos.tsx
- Contact.tsx
- Matriz SEO on-page — FRECOIN
- deployment-guardian.md
- docs-sync
- sonner.tsx
- collapsible.tsx
- React + TypeScript + Vite
- Deploy, synchronize CMS, and verify measurement
- implementer.md
- package.json
- deploy-check
- session-start
- verify
- SkillsTestimonials.tsx
- TextMarquee.tsx
- docs-curator.md
- orchestrator.md
- reviewer.md
- @radix-ui/react-aspect-ratio
- clsx
- @radix-ui/react-accordion
- @radix-ui/react-dropdown-menu
- @radix-ui/react-radio-group
- react@^19.2.0
- vite.config.ts
- react-day-picker
- react-hook-form
- react-resizable-panels
- swiper
- tailwind-merge
- zod@^4.3.5

## God Nodes (most connected - your core abstractions)
1. `cn()` - 270 edges
2. `compilerOptions` - 22 edges
3. `compilerOptions` - 18 edges
4. `react-router-dom` - 16 edges
5. `compilerOptions` - 16 edges
6. `usePageMeta()` - 16 edges
7. `App()` - 15 edges
8. `HomePage()` - 15 edges
9. `class-variance-authority` - 14 edges
10. `gsap` - 14 edges

## Surprising Connections (you probably didn't know these)
- `Arquitectura (decisiones)` --references--> `cropToRatioWebp()`  [INFERRED]
  progress/2026-06-17-backoffice-cms.md → panel/src/lib/imageUtils.ts
- `2.2 Imágenes → **subida al servidor de Hostinger** (`/assets/uploads/`), NO Cloudinary` --references--> `compressImage()`  [INFERRED]
  docs/PLAN-BACKOFFICE-CMS.md → panel/src/lib/imageUtils.ts
- `GitHub Actions` --references--> `main()`  [INFERRED]
  HANDOFF.md → scripts/prerender.mjs
- `6. Plan por fases` --references--> `ProtectedRoute()`  [INFERRED]
  docs/PLAN-BACKOFFICE-CMS.md → panel/src/components/ProtectedRoute.tsx
- `✅ Backoffice — completado (sesión 2026-06-17)` --references--> `cropToRatioWebp()`  [INFERRED]
  tasks/current.md → panel/src/lib/imageUtils.ts

## Import Cycles
- None detected.

## Communities (108 total, 27 thin omitted)

### Community 0 - "cn"
Cohesion: 0.06
Nodes (39): AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback(), AvatarImage(), Card(), CardAction() (+31 more)

### Community 1 - "sidebar.tsx"
Cohesion: 0.07
Nodes (39): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetPortal(), SheetTitle() (+31 more)

### Community 2 - "carousel.tsx"
Cohesion: 0.08
Nodes (33): AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay(), AlertDialogPortal() (+25 more)

### Community 3 - "dependencies"
Cohesion: 0.05
Nodes (38): dependencies, cmdk@^1.1.1, date-fns@^4.1.0, embla-carousel-react@^8.6.0, gsap@^3.15.0, lucide-react@^0.562.0, @radix-ui/react-alert-dialog@^1.1.15, @radix-ui/react-checkbox@^1.3.3 (+30 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (37): devDependencies, autoprefixer@^10.4.23, eslint@^9.39.1, @eslint/js@^9.39.1, eslint-plugin-react-hooks@^7.0.1, eslint-plugin-react-refresh@^0.4.24, globals@^16.5.0, postcss@^8.5.6 (+29 more)

### Community 5 - "HomePage.tsx"
Cohesion: 0.13
Nodes (23): 6. Plan por fases, gsap, trackEvent(), HOME_DESCRIPTION, HOME_TITLE, HomePage(), ScrollToTop(), About() (+15 more)

### Community 6 - "panel/package.json"
Cohesion: 0.07
Nodes (40): dependencies, @dnd-kit/core@^6.3.1, @dnd-kit/sortable@^10.0.0, @dnd-kit/utilities@^3.2.2, lucide-react@^0.460.0, react@^19.2.0, react-dom@^19.2.0, react-router@^7.6.1 (+32 more)

### Community 7 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowImportingTsExtensions, baseUrl, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+15 more)

### Community 8 - "with"
Cohesion: 0.07
Nodes (28): name, runs-on, steps, VITE_GA4_ID, VITE_GTM_ID, jobs, build-and-publish, name (+20 more)

### Community 9 - "utils.ts"
Cohesion: 0.08
Nodes (13): Checkbox(), HoverCardContent(), InputOTP(), InputOTPGroup(), InputOTPSlot(), Progress(), ResizableHandle(), ResizablePanelGroup() (+5 more)

### Community 10 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 11 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 12 - "ServiceLayout.tsx"
Cohesion: 0.21
Nodes (17): react-router-dom, BreadcrumbJsonLd(), Crumb, JsonLd(), LegalLayoutProps, ServiceLayout(), dimsOf(), imageDims (+9 more)

### Community 13 - "services.ts"
Cohesion: 0.11
Nodes (19): Files inspected, Props, antenasWifi, applyOverride(), camarasVideovigilancia, controlesAcceso, getServiceBySlug(), instalacionesElectricas (+11 more)

### Community 14 - "HANDOFF.md — frecoin-web (verdad operativa)"
Cohesion: 0.06
Nodes (32): Al cerrar cada sesión que despliegue, Backups en servidor Hostinger, Comunicaciones con el cliente (verificado 2026-06-12), Contenido en vivo (build acumulado 08-jun), Contexto histórico (puede contener estados ya superados), Código local — comprobado el 08/09, Cómo se despliega DE VERDAD, Deploy de referencia: completado el 03/09 (+24 more)

### Community 15 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, jsx, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 16 - "panel/src/App.tsx"
Cohesion: 0.19
Nodes (13): BACKOFFICE CMS (sesión 2026-06-18) — EN VIVO, App(), Layout(), NAV, NavItem, ProtectedRoute(), CARDS, Dashboard() (+5 more)

### Community 17 - "PLAN — Backoffice CMS para frecoin.es"
Cohesion: 0.13
Nodes (14): 0. Principio rector, 1. Arquitectura objetivo, 2.1 Autenticación → **sesión PHP + cookie HttpOnly + CSRF** (NO JWT), 2.2 Imágenes → **subida al servidor de Hostinger** (`/assets/uploads/`), NO Cloudinary, 2.3 Sitio público → **snapshots JSON regenerados al guardar** (NO lectura PHP en vivo), 2. Decisiones de arquitectura (las tres que importan), 3. Qué se reutiliza del frontend de DoodleForever, 4. Esquema MySQL (+6 more)

### Community 18 - "command.tsx"
Cohesion: 0.16
Nodes (16): Command(), CommandDialog(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator(), CommandShortcut() (+8 more)

### Community 19 - "GTM + GA4 measurement setup"
Cohesion: 0.22
Nodes (8): Code changed, GTM + GA4 measurement setup, GTM workspace prepared (not published), Objective, Production deployment, Remaining verification, Verification, Verified access and configuration

### Community 20 - "field.tsx"
Cohesion: 0.14
Nodes (16): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Field(), FieldContent(), FieldDescription(), FieldError() (+8 more)

### Community 21 - "src/App.tsx"
Cohesion: 0.26
Nodes (10): Rutas del código (App.tsx) — mapa completo, App(), LegalLayout(), WhatsAppFloat(), initAnalyticsFromConsent(), trackPageView(), AvisoLegal(), PoliticaCookies() (+2 more)

### Community 22 - "form.tsx"
Cohesion: 0.17
Nodes (14): @radix-ui/react-label@^2.1.8, @radix-ui/react-label, FieldLabel(), FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItem() (+6 more)

### Community 23 - "menubar.tsx"
Cohesion: 0.12
Nodes (12): Menubar(), MenubarCheckboxItem(), MenubarContent(), MenubarItem(), MenubarLabel(), MenubarPortal(), MenubarRadioItem(), MenubarSeparator() (+4 more)

### Community 24 - "api.ts"
Cohesion: 0.22
Nodes (11): AdminUser, api, Lead, LeadCounts, LeadStatus, setCsrf(), FILTERS, STATUS_META (+3 more)

### Community 25 - "tasks/current.md — frecoin-web active task queue"
Cohesion: 0.06
Nodes (30): AGENTS.md — frecoin-web project harness, Commit conventions, Do not run without explicit permission, Do not touch without explicit permission, Documentation discipline, How to verify a change, Read on session start, Sources of truth (in this order) (+22 more)

### Community 26 - "ref_lucide_react"
Cohesion: 0.20
Nodes (9): useScrollReveal(), Blog(), blogs, ClientLogos(), logos, AccordionItem(), FAQ(), faqs (+1 more)

### Community 27 - "context-menu.tsx"
Cohesion: 0.12
Nodes (9): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubContent() (+1 more)

### Community 28 - "2026-06-11 — Propuesta SEO FRECOIN + borradores Gmail + RGPD"
Cohesion: 0.15
Nodes (12): 2026-06-11 — Propuesta SEO FRECOIN + borradores Gmail + RGPD, Alta en directorios — protocolo, Archivos creados / modificados (en `correos/` — gitignored), Borradores Gmail creados, Decisiones tomadas, Estado de producción verificado, Extras opcionales (sin precio en el PDF, mencionados sin presión), Herramientas modificadas (fuera del repo frecoin-web) (+4 more)

### Community 29 - "analytics.ts"
Cohesion: 0.23
Nodes (13): ConsentRecord, ConsentValue, CookieBanner(), readConsent(), writeConsent(), ConsentState, disableAnalytics(), enableAnalytics() (+5 more)

### Community 30 - "class-variance-authority"
Cohesion: 0.20
Nodes (11): class-variance-authority@^0.7.1, class-variance-authority, Alert(), AlertDescription(), AlertTitle(), alertVariants, ToggleGroup(), ToggleGroupContext (+3 more)

### Community 31 - "db"
Cohesion: 0.06
Nodes (36): Commands run, Files inspected, Módulo de usuarios del panel + cambio de contraseña propia, Next step, Objective, Open risks, Verification result (prod en vivo, no supuesto), Auditoría adversarial del backoffice (workflow, 29 agentes) (+28 more)

### Community 32 - "ref_react"
Cohesion: 0.20
Nodes (6): WifiRouterIcon, PageMeta, setCanonical(), setMetaByName(), setMetaByProperty(), usePageMeta()

### Community 33 - "Verify SEO production handoff"
Cohesion: 0.22
Nodes (8): Commands run, Files changed, Files inspected, Next step, Objective, Open risks, Verification, Verify SEO production handoff

### Community 34 - "Arranque del proyecto SEO FRECOIN"
Cohesion: 0.22
Nodes (8): Arranque del proyecto SEO FRECOIN, Commands run, Files changed, Files inspected, Next step, Objective, Open risks, Verification result

### Community 35 - "Accesos Google — correos enviados, Luis confirma por WhatsApp"
Cohesion: 0.25
Nodes (7): Accesos Google — correos enviados, Luis confirma por WhatsApp, Commands run, Files changed, Next step, Objective, Open risks, Verification result

### Community 36 - "prerender.mjs"
Cohesion: 0.06
Nodes (33): ADR-001 — Arquitectura de deploy de frecoin.es, Alternatives (para automatizar — recomendado a futuro), Consequences, Context, Decision, Archivos cambiados (documentación), Comandos relevantes, Conclusión (+25 more)

### Community 37 - "Zona de servicio "Barcelona y Cataluña" + imágenes SAI profesionales"
Cohesion: 0.20
Nodes (9): Commands run, Decisión no obvia, Files changed, Files inspected, Next step, Objective, Open risks, Verification (+1 more)

### Community 38 - "Evaluar panel de auto-edición de contenido (CMS) — DIFERIDO"
Cohesion: 0.22
Nodes (8): Commands run, Evaluar panel de auto-edición de contenido (CMS) — DIFERIDO, Files changed, Findings (no code changed), Next step, Objective, Open risks, Verification

### Community 39 - "Logo del panel + incidente de deploy + recuperación"
Cohesion: 0.20
Nodes (9): Comandos de verificación (resultado), Deploy correcto del logo, Incidente (qué salió mal), Logo del panel + incidente de deploy + recuperación, Next step, Objective, Open risks, Qué se cambió (código) (+1 more)

### Community 40 - "input-group.tsx"
Cohesion: 0.21
Nodes (11): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea() (+3 more)

### Community 41 - "item.tsx"
Cohesion: 0.18
Nodes (12): Item(), ItemActions(), ItemContent(), ItemDescription(), ItemFooter(), ItemGroup(), ItemHeader(), ItemMedia() (+4 more)

### Community 42 - "Backoffice CMS — autoedición de frecoin (React + PHP + MySQL)"
Cohesion: 0.22
Nodes (8): Archivos cambiados, Arquitectura (decisiones), Backoffice CMS — autoedición de frecoin (React + PHP + MySQL), Comandos / deploy, Objetivo, Riesgos abiertos, Siguiente paso, Verificación (en vivo)

### Community 43 - "Usuarios.tsx"
Cohesion: 0.43
Nodes (6): AdminRole, AdminUserFull, fmtDate(), genPassword(), Usuarios(), Files changed

### Community 44 - "CLAUDE.md — frecoin-web (Claude Code-specific)"
Cohesion: 0.25
Nodes (7): Claude Code session start, CLAUDE.md — frecoin-web (Claude Code-specific), Project owner working preferences, Skills available under `.claude/skills/`, Subagents available under `.claude/agents/`, Verification, Vocabulario de cierre y publicación (convención del dueño)

### Community 45 - "Contenido.tsx"
Cohesion: 0.29
Nodes (10): ContentItem, compressImage(), cropToRatioWebp(), fileToBase64(), Contenido(), cropRatio(), ImageContentField(), SECTION_HINT (+2 more)

### Community 46 - "Remediación de la auditoría del backoffice"
Cohesion: 0.25
Nodes (7): Commands run, Files changed, Next step, Objective, Open risks, Remediación de la auditoría del backoffice, Verification result (prod en vivo)

### Community 47 - "breadcrumb.tsx"
Cohesion: 0.20
Nodes (8): @radix-ui/react-slot, Badge(), badgeVariants, BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbPage(), BreadcrumbSeparator()

### Community 48 - "chart.tsx"
Cohesion: 0.27
Nodes (10): ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartStyle(), ChartTooltipContent(), getPayloadConfigFromPayload() (+2 more)

### Community 49 - "Publicar el rediseño en producción (deploy manual)"
Cohesion: 0.29
Nodes (6): Next step, Objective, Open risks, Publicar el rediseño en producción (deploy manual), Qué se hizo, Verificación

### Community 50 - "verify.sh"
Cohesion: 0.71
Nodes (6): fail(), ok(), run_npm_script(), say(), verify.sh script, warn()

### Community 51 - "tsconfig.json"
Cohesion: 0.33
Nodes (5): compilerOptions, baseUrl, paths, files, references

### Community 52 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, build:only, dev, lint, prerender, preview

### Community 53 - "drawer.tsx"
Cohesion: 0.22
Nodes (7): DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerPortal(), DrawerTitle()

### Community 54 - "select.tsx"
Cohesion: 0.22
Nodes (7): SelectContent(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger()

### Community 55 - "navigation-menu.tsx"
Cohesion: 0.24
Nodes (9): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger(), navigationMenuTriggerStyle (+1 more)

### Community 56 - "progress/ — multi-step task journal"
Cohesion: 0.33
Nodes (5): Discipline, Naming, progress/ — multi-step task journal, Template, When to create an entry

### Community 57 - "Apply client copy and audit GBP"
Cohesion: 0.22
Nodes (8): Apply client copy and audit GBP, Commands run, Files changed, Files inspected, Next step, Objective, Open risks, Verification

### Community 58 - "Deploy customer confirmation email correction"
Cohesion: 0.22
Nodes (8): Commands run, Deploy customer confirmation email correction, Files changed, Files inspected, Next step, Objective, Open risks, Verification

### Community 59 - "Servicios.tsx"
Cohesion: 0.39
Nodes (7): ServiceUpdate, Field(), ImageField(), priceLabel(), SERVICE_DEFAULT_IMAGES, ServiceEditor(), Servicios()

### Community 60 - "SEO implementation evidence for the client presentation"
Cohesion: 0.25
Nodes (7): Evidence, Files and history inspected, Files changed, Objective, Open scope, SEO implementation evidence for the client presentation, Verification

### Community 61 - "empty.tsx"
Cohesion: 0.29
Nodes (7): Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle()

### Community 62 - "popover.tsx"
Cohesion: 0.29
Nodes (3): @radix-ui/react-popover@^1.1.15, @radix-ui/react-popover, PopoverContent()

### Community 63 - "Trabajos.tsx"
Cohesion: 0.38
Nodes (6): GalleryItem, WorkArea, AREAS, SortablePhoto(), Trabajos(), Files changed

### Community 64 - "Contact.tsx"
Cohesion: 0.33
Nodes (6): companyLinks, Contact(), contactInfo, hours, ScrollToTop(), serviceOptions

### Community 65 - "Matriz SEO on-page — FRECOIN"
Cohesion: 0.29
Nodes (6): Arquitectura para búsqueda e IA, Control de CMS, Matriz SEO on-page — FRECOIN, Regla editorial, Service, BreadcrumbList()

### Community 66 - "deployment-guardian.md"
Cohesion: 0.33
Nodes (5): After a deploy, Approval protocol, Commands you guard (Hostinger — deploy MANUAL), What you may run freely, You must block if any of these is true

### Community 67 - "docs-sync"
Cohesion: 0.33
Nodes (5): After a shipped change, Do not, docs-sync, Procedure, Source-of-truth hierarchy

### Community 68 - "sonner.tsx"
Cohesion: 0.33
Nodes (4): next-themes@^0.4.6, sonner@^2.0.7, next-themes, sonner

### Community 70 - "React + TypeScript + Vite"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 71 - "Deploy, synchronize CMS, and verify measurement"
Cohesion: 0.33
Nodes (5): Deploy, synchronize CMS, and verify measurement, Files changed, Objective, Open boundaries, Work and evidence

### Community 72 - "implementer.md"
Cohesion: 0.40
Nodes (4): Operating rules, Progress journal, Verification after the change, When to escalate

### Community 73 - "package.json"
Cohesion: 0.07
Nodes (26): @hookform/resolvers@^5.2.2, input-otp@^1.4.2, @radix-ui/react-avatar@^1.1.11, @radix-ui/react-context-menu@^2.2.16, @radix-ui/react-menubar@^1.1.16, @radix-ui/react-separator@^1.1.8, @radix-ui/react-tabs@^1.1.13, @radix-ui/react-toggle-group@^1.1.11 (+18 more)

### Community 74 - "deploy-check"
Cohesion: 0.40
Nodes (4): Checklist, Commands you may NOT run from this skill, Commands you may run, deploy-check

### Community 75 - "session-start"
Cohesion: 0.40
Nodes (4): Do not, Procedure, Report back, session-start

### Community 76 - "verify"
Cohesion: 0.40
Nodes (4): Do not, Interpret results, Procedure, verify

### Community 77 - "SkillsTestimonials.tsx"
Cohesion: 0.50
Nodes (4): CircularProgress(), skills, SkillsTestimonials(), testimonials

### Community 78 - "TextMarquee.tsx"
Cohesion: 0.50
Nodes (4): line1, line2, MarqueeLine(), TextMarquee()

### Community 79 - "docs-curator.md"
Cohesion: 0.50
Nodes (3): Source-of-truth hierarchy, What you do, What you do not do

### Community 80 - "orchestrator.md"
Cohesion: 0.50
Nodes (3): Hard rules, What you produce, When to write a `progress/` entry

### Community 81 - "reviewer.md"
Cohesion: 0.50
Nodes (3): Hard rules, Output format, What to check, in order

## Knowledge Gaps
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `sidebar.tsx`, `carousel.tsx`, `utils.ts`, `command.tsx`, `field.tsx`, `form.tsx`, `menubar.tsx`, `context-menu.tsx`, `class-variance-authority`, `input-group.tsx`, `item.tsx`, `breadcrumb.tsx`, `chart.tsx`, `drawer.tsx`, `select.tsx`, `navigation-menu.tsx`, `empty.tsx`, `popover.tsx`, `Matriz SEO on-page — FRECOIN`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.06359189378057302 - nodes in this community are weakly interconnected._
- **Why does `Files changed` connect `Trabajos.tsx` to `db`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Should `sidebar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07246376811594203 - nodes in this community are weakly interconnected._
- **Why does `puppeteer-core` connect `devDependencies` to `package.json`, `prerender.mjs`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Should `carousel.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07682926829268293 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
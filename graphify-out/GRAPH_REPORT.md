# Graph Report - frecoin-web-produccion  (2026-08-30)

## Corpus Check
- 173 files · ~368,614 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1105 nodes · 1569 edges · 99 communities (95 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d540be2a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 98|Community 98]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 270 edges
2. `compilerOptions` - 22 edges
3. `compilerOptions` - 18 edges
4. `compilerOptions` - 16 edges
5. `useAuth()` - 13 edges
6. `usePageMeta()` - 13 edges
7. `tasks/current.md — frecoin-web active task queue` - 13 edges
8. `AGENTS.md — frecoin-web project harness` - 12 edges
9. `PLAN — Backoffice CMS para frecoin.es` - 12 edges
10. `HANDOFF.md — frecoin-web (verdad operativa)` - 10 edges

## Surprising Connections (you probably didn't know these)
- `regenerate_content_snapshot()` --calls--> `db()`  [INFERRED]
  public/admin/api/content.php → public/admin/api/db.php
- `fetch_gallery()` --calls--> `db()`  [INFERRED]
  public/admin/api/gallery.php → public/admin/api/db.php
- `regenerate_gallery_snapshot()` --calls--> `db()`  [INFERRED]
  public/admin/api/gallery.php → public/admin/api/db.php
- `regenerate_snapshot()` --calls--> `db()`  [INFERRED]
  public/admin/api/services.php → public/admin/api/db.php
- `active_super_admins()` --calls--> `db()`  [INFERRED]
  public/admin/api/users.php → public/admin/api/db.php

## Import Cycles
- None detected.

## Communities (99 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (37): Layout(), NAV, NavItem, ProtectedRoute(), AdminRole, AdminUser, AdminUserFull, api (+29 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (36): cn(), Avatar(), AvatarFallback(), AvatarImage(), Card(), CardAction(), CardContent(), CardDescription() (+28 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (40): useIsMobile(), Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle() (+32 more)

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (50): dependencies, class-variance-authority, clsx, cmdk, date-fns, embla-carousel-react, gsap, @hookform/resolvers (+42 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (31): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, kimi-plugin-inspect-react (+23 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (16): regenerate_content_snapshot(), db(), fetch_gallery(), regenerate_gallery_snapshot(), regenerate_snapshot(), active_super_admins(), fetch_user(), boot() (+8 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (25): dependencies, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, lucide-react, react, react-dom, react-router (+17 more)

### Community 7 - "Community 7"
Cohesion: 0.08
Nodes (24): compilerOptions, allowImportingTsExtensions, baseUrl, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+16 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): antenasWifi, applyOverride(), camarasVideovigilancia, controlesAcceso, getServiceBySlug(), instalacionesElectricas, procesoFRECOIN, redesInformaticas (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (15): Command(), CommandDialog(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator(), CommandShortcut() (+7 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 11 - "Community 11"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 12 - "Community 12"
Cohesion: 0.16
Nodes (12): Field(), FieldContent(), FieldDescription(), FieldError(), FieldGroup(), FieldLabel(), FieldLegend(), FieldSeparator() (+4 more)

### Community 13 - "Community 13"
Cohesion: 0.13
Nodes (14): ConsentRecord, ConsentValue, CookieBanner(), WhatsAppFloat(), disableAnalytics(), enableAnalytics(), GA4_ID, GTM_ID (+6 more)

### Community 14 - "Community 14"
Cohesion: 0.09
Nodes (22): Al cerrar cada sesión que despliegue, BACKOFFICE CMS (sesión 2026-06-18) — EN VIVO, Backups en servidor Hostinger, Comunicaciones con el cliente (verificado 2026-06-12), Contenido en vivo (build acumulado 08-jun), Cómo se despliega DE VERDAD, Deploy: PENDIENTE (parado a propósito), Directorios locales — NAP y guía (+14 more)

### Community 15 - "Community 15"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, jsx, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 16 - "Community 16"
Cohesion: 0.12
Nodes (11): Menubar(), MenubarCheckboxItem(), MenubarContent(), MenubarItem(), MenubarLabel(), MenubarRadioItem(), MenubarSeparator(), MenubarShortcut() (+3 more)

### Community 17 - "Community 17"
Cohesion: 0.12
Nodes (15): 0. Principio rector, 1. Arquitectura objetivo, 2.1 Autenticación → **sesión PHP + cookie HttpOnly + CSRF** (NO JWT), 2.2 Imágenes → **subida al servidor de Hostinger** (`/assets/uploads/`), NO Cloudinary, 2.3 Sitio público → **snapshots JSON regenerados al guardar** (NO lectura PHP en vivo), 2. Decisiones de arquitectura (las tres que importan), 3. Qué se reutiliza del frontend de DoodleForever, 4. Esquema MySQL (+7 more)

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (9): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut(), DropdownMenuSubContent() (+1 more)

### Community 19 - "Community 19"
Cohesion: 0.16
Nodes (9): LegalLayout(), LegalLayoutProps, services, AvisoLegal(), PoliticaPrivacidad(), FooterCTA(), legalLinks, NavLink (+1 more)

### Community 20 - "Community 20"
Cohesion: 0.08
Nodes (13): AccordionContent(), AccordionItem(), AccordionTrigger(), Badge(), badgeVariants, Checkbox(), HoverCardContent(), Progress() (+5 more)

### Community 21 - "Community 21"
Cohesion: 0.07
Nodes (32): AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay(), AlertDialogTitle() (+24 more)

### Community 22 - "Community 22"
Cohesion: 0.26
Nodes (8): useScrollReveal(), Blog(), blogs, ClientLogos(), logos, Services(), reasons, WhyChooseUs()

### Community 23 - "Community 23"
Cohesion: 0.12
Nodes (9): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubContent() (+1 more)

### Community 24 - "Community 24"
Cohesion: 0.23
Nodes (10): FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItem(), FormItemContext, FormItemContextValue, FormLabel() (+2 more)

### Community 25 - "Community 25"
Cohesion: 0.15
Nodes (12): AGENTS.md — frecoin-web project harness, Commit conventions, Do not run without explicit permission, Do not touch without explicit permission, Documentation discipline, How to verify a change, Read on session start, Sources of truth (in this order) (+4 more)

### Community 26 - "Community 26"
Cohesion: 0.16
Nodes (14): BreadcrumbJsonLd(), Crumb, JsonLd(), Props, ServiceLayout(), dimsOf(), imageDims, getRelatedServices() (+6 more)

### Community 27 - "Community 27"
Cohesion: 0.21
Nodes (6): About(), features, Hero(), SubmitState, Numbers(), stats

### Community 28 - "Community 28"
Cohesion: 0.15
Nodes (12): 2026-06-11 — Propuesta SEO FRECOIN + borradores Gmail + RGPD, Alta en directorios — protocolo, Archivos creados / modificados (en `correos/` — gitignored), Borradores Gmail creados, Decisiones tomadas, Estado de producción verificado, Extras opcionales (sin precio en el PDF, mencionados sin presión), Herramientas modificadas (fuera del repo frecoin-web) (+4 more)

### Community 29 - "Community 29"
Cohesion: 0.14
Nodes (13): 🔍 Auditoría del backoffice (2026-07-23/24) — REMEDIADA, ✅ Backoffice — completado (sesión 2026-06-17), 🟡 Backoffice — pendiente, Blocked, Borradores obsoletos a eliminar manualmente desde Gmail, Current state, Diferido (medio plazo, sin compromiso), Known pre-existing failures (not blockers) (+5 more)

### Community 30 - "Community 30"
Cohesion: 0.13
Nodes (17): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Item(), ItemActions(), ItemContent(), ItemDescription() (+9 more)

### Community 31 - "Community 31"
Cohesion: 0.17
Nodes (11): Auditoría adversarial del backoffice (workflow, 29 agentes), Bugfix (mismo día) — 500 al añadir foto, Commands run, Files changed, Galería "Trabajos realizados" — multi-foto por área (acumular), Next step, Objective, Open risks (+3 more)

### Community 32 - "Community 32"
Cohesion: 0.18
Nodes (6): DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 33 - "Community 33"
Cohesion: 0.22
Nodes (8): ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), THEMES, useChart()

### Community 34 - "Community 34"
Cohesion: 0.22
Nodes (8): Arranque del proyecto SEO FRECOIN, Commands run, Files changed, Files inspected, Next step, Objective, Open risks, Verification result

### Community 35 - "Community 35"
Cohesion: 0.25
Nodes (7): Accesos Google — correos enviados, Luis confirma por WhatsApp, Commands run, Files changed, Next step, Objective, Open risks, Verification result

### Community 36 - "Community 36"
Cohesion: 0.22
Nodes (11): CHROME_CANDIDATES, __dirname, DIST, findChrome(), main(), outputFileFor(), renderRoute(), ROOT (+3 more)

### Community 37 - "Community 37"
Cohesion: 0.20
Nodes (9): Commands run, Decisión no obvia, Files changed, Files inspected, Next step, Objective, Open risks, Verification (+1 more)

### Community 38 - "Community 38"
Cohesion: 0.20
Nodes (9): Commands run, Evaluar panel de auto-edición de contenido (CMS) — DIFERIDO, Files changed, Files inspected, Findings (no code changed), Next step, Objective, Open risks (+1 more)

### Community 39 - "Community 39"
Cohesion: 0.20
Nodes (9): Comandos de verificación (resultado), Deploy correcto del logo, Incidente (qué salió mal), Logo del panel + incidente de deploy + recuperación, Next step, Objective, Open risks, Qué se cambió (código) (+1 more)

### Community 40 - "Community 40"
Cohesion: 0.22
Nodes (9): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger(), navigationMenuTriggerStyle (+1 more)

### Community 41 - "Community 41"
Cohesion: 0.22
Nodes (8): Archivos cambiados (documentación), Comandos relevantes, Conclusión, Descubrir el mecanismo real de deploy a producción, Next step, Objective, Open risks, Qué se inspeccionó

### Community 42 - "Community 42"
Cohesion: 0.22
Nodes (8): Archivos cambiados, Arquitectura (decisiones), Backoffice CMS — autoedición de frecoin (React + PHP + MySQL), Comandos / deploy, Objetivo, Riesgos abiertos, Siguiente paso, Verificación (en vivo)

### Community 43 - "Community 43"
Cohesion: 0.22
Nodes (8): Commands run, Files changed, Files inspected, Módulo de usuarios del panel + cambio de contraseña propia, Next step, Objective, Open risks, Verification result (prod en vivo, no supuesto)

### Community 44 - "Community 44"
Cohesion: 0.25
Nodes (7): Claude Code session start, CLAUDE.md — frecoin-web (Claude Code-specific), Project owner working preferences, Skills available under `.claude/skills/`, Subagents available under `.claude/agents/`, Verification, Vocabulario de cierre y publicación (convención del dueño)

### Community 45 - "Community 45"
Cohesion: 0.25
Nodes (7): 2026-06-08 — Cláusulas RGPD oficiales bajo formularios, Archivos cambiados, Comandos / verificación, Commits (rama draft/diseno), Contexto / decisión, Objetivo, Riesgos abiertos / siguiente paso

### Community 46 - "Community 46"
Cohesion: 0.25
Nodes (7): Commands run, Files changed, Next step, Objective, Open risks, Remediación de la auditoría del backoffice, Verification result (prod en vivo)

### Community 47 - "Community 47"
Cohesion: 0.29
Nodes (7): Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle()

### Community 48 - "Community 48"
Cohesion: 0.29
Nodes (4): companyLinks, contactInfo, hours, serviceOptions

### Community 49 - "Community 49"
Cohesion: 0.29
Nodes (6): Next step, Objective, Open risks, Publicar el rediseño en producción (deploy manual), Qué se hizo, Verificación

### Community 50 - "Community 50"
Cohesion: 0.71
Nodes (6): fail(), ok(), run_npm_script(), say(), warn(), verify.sh script

### Community 51 - "Community 51"
Cohesion: 0.29
Nodes (6): compilerOptions, baseUrl, paths, files, @/*, references

### Community 52 - "Community 52"
Cohesion: 0.43
Nodes (5): ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 53 - "Community 53"
Cohesion: 0.33
Nodes (5): After a deploy, Approval protocol, Commands you guard (Hostinger — deploy MANUAL), What you may run freely, You must block if any of these is true

### Community 54 - "Community 54"
Cohesion: 0.33
Nodes (5): ADR-001 — Arquitectura de deploy de frecoin.es, Alternatives (para automatizar — recomendado a futuro), Consequences, Context, Decision

### Community 55 - "Community 55"
Cohesion: 0.33
Nodes (5): After a shipped change, Do not, docs-sync, Procedure, Source-of-truth hierarchy

### Community 56 - "Community 56"
Cohesion: 0.33
Nodes (5): Discipline, Naming, progress/ — multi-step task journal, Template, When to create an entry

### Community 57 - "Community 57"
Cohesion: 0.21
Nodes (10): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea() (+2 more)

### Community 58 - "Community 58"
Cohesion: 0.40
Nodes (4): Operating rules, Progress journal, Verification after the change, When to escalate

### Community 59 - "Community 59"
Cohesion: 0.40
Nodes (4): Checklist, Commands you may NOT run from this skill, Commands you may run, deploy-check

### Community 62 - "Community 62"
Cohesion: 0.40
Nodes (4): Do not, Procedure, Report back, session-start

### Community 63 - "Community 63"
Cohesion: 0.29
Nodes (6): BOOTSTRAP.md — arranque rápido para otra IA, Cómo invocarlo en otro lugar, Orden de lectura (de más a menos autoridad), Qué es este proyecto (una frase), Qué NO es portable fuera de esta máquina/cuenta, Verificación (funciona en cualquier IA con shell)

### Community 64 - "Community 64"
Cohesion: 0.50
Nodes (4): Alert(), AlertDescription(), AlertTitle(), alertVariants

### Community 65 - "Community 65"
Cohesion: 0.28
Nodes (4): PageMeta, usePageMeta(), NotFound(), Rediseno()

### Community 66 - "Community 66"
Cohesion: 0.40
Nodes (4): Do not, Interpret results, Procedure, verify

### Community 67 - "Community 67"
Cohesion: 0.50
Nodes (3): Source-of-truth hierarchy, What you do, What you do not do

### Community 68 - "Community 68"
Cohesion: 0.50
Nodes (3): Hard rules, What you produce, When to write a `progress/` entry

### Community 69 - "Community 69"
Cohesion: 0.50
Nodes (3): Hard rules, Output format, What to check, in order

### Community 70 - "Community 70"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 73 - "Community 73"
Cohesion: 0.40
Nodes (3): InputOTP(), InputOTPGroup(), InputOTPSlot()

### Community 74 - "Community 74"
Cohesion: 0.25
Nodes (6): BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator()

## Knowledge Gaps
- **456 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+451 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 1` to `Community 2`, `Community 9`, `Community 12`, `Community 16`, `Community 18`, `Community 20`, `Community 21`, `Community 23`, `Community 24`, `Community 30`, `Community 32`, `Community 33`, `Community 40`, `Community 47`, `Community 52`, `Community 57`, `Community 64`, `Community 73`, `Community 74`, `Community 98`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 3` to `Community 4`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _456 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05687645687645688 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07493061979648474 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05673758865248227 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._
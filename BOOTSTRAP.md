# BOOTSTRAP.md — arranque rápido para otra IA

> Este archivo existe para que **cualquier IA** (ChatGPT, Cursor, Gemini, otra
> sesión de Claude, un humano nuevo) pueda retomar este proyecto sin haber
> visto ninguna conversación previa. Es la puerta de entrada — los detalles
> reales están en los archivos que enlaza abajo, no aquí.

## Cómo invocarlo en otro lugar

Pega esto como primer mensaje en cualquier IA con acceso a este repo
(clonado, o pegando el contenido de los archivos si el chat no tiene
filesystem):

```
Lee BOOTSTRAP.md de este repo y luego HANDOFF.md, AGENTS.md y
tasks/current.md. Dime en qué estado está el proyecto y qué es lo
siguiente a hacer. No inventes tareas — pregúntame qué quiero hacer.
```

Si la IA no tiene acceso al repo (ej. ChatGPT sin herramientas de código),
pega directamente el contenido de `HANDOFF.md` + `AGENTS.md` +
`tasks/current.md` en el chat antes de pedir ayuda.

## Qué es este proyecto (una frase)

Web corporativa de **FRECOIN** (Luis Freire, infraestructuras tecnológicas
para empresas en Sant Vicenç dels Horts/Barcelona) + su backoffice CMS.
Repo público: `github.com/creativedesignseo/frecoin-web`.

## Orden de lectura (de más a menos autoridad)

1. **[HANDOFF.md](HANDOFF.md)** — qué hay en producción HOY, verificado, no supuesto.
2. **[AGENTS.md](AGENTS.md)** — reglas del proyecto: qué no tocar, cómo verificar,
   cómo desplegar, convenciones. Válido para cualquier IA, no solo Claude Code.
3. **[tasks/current.md](tasks/current.md)** — cola de trabajo pendiente/activo.
4. **`progress/YYYY-MM-DD-*.md`** — decisiones no obvias de sesiones anteriores
   (el más reciente primero).

## Qué NO es portable fuera de esta máquina/cuenta

- Credenciales SSH (`~/.ssh/frecoin_hostinger`), login de Gmail CLI, tokens
  de Hostinger — viven en la máquina de Jonatan, no en el repo. Otra IA
  necesitará sus propios accesos o que Jonatan actúe de intermediario.
- Los **subagentes** (`.claude/agents/`) y **skills** (`.claude/skills/`)
  son específicos de Claude Code. Otra IA no los "ejecuta", pero puede leer
  su contenido en texto y aplicar la misma lógica manualmente.

## Verificación (funciona en cualquier IA con shell)

```bash
bash scripts/verify.sh
```

No depende de ninguna IA en concreto — es un script de bash normal.

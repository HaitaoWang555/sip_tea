###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-slim As development
RUN npm config set registry https://registry.npmmirror.com/

WORKDIR /usr/local/lib/sip_tea
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY --chown=node:node . ./

RUN npm pkg delete scripts.prepare
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm be:build
RUN pnpm fe:build

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-slim As build

WORKDIR /usr/local/lib/sip_tea

COPY --chown=node:node .npmrc pnpm-lock.yaml package.json ./
COPY --chown=node:node --from=development /usr/local/lib/sip_tea/packages/lib/package.json ./packages/lib/
COPY --chown=node:node --from=development /usr/local/lib/sip_tea/packages/be/package.json ./packages/be/
ENV NODE_ENV production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm pkg delete scripts.prepare
RUN npm pkg delete scripts.postinstall

RUN corepack enable

COPY --chown=node:node --from=development /usr/local/lib/sip_tea/packages/be/.env ./packages/be/.env
COPY --chown=node:node --from=development /usr/local/lib/sip_tea/packages/be/dist ./packages/be/dist
COPY --chown=node:node --from=development /usr/local/lib/sip_tea/packages/fe/dist ./packages/be/static
COPY --chown=node:node --from=development /usr/local/lib/sip_tea/packages/lib/dist ./packages/lib/dist

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --filter be --filter lib

EXPOSE 3000
CMD [ "pnpm", "be:start" ]
USER node

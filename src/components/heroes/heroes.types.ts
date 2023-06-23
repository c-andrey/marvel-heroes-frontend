type HeroThumbnailType = {
    path: string
    extension: string
}

type HeroComicsItemType = {
    resourceURI: string
    name: string
}

type HeroComicsType = {
    available: number
    collectionURI: string
    items: HeroComicsItemType[]
    returned: number
}

type HeroSeriesItemType = {
    resourceURI: string
    name: string
    type: string
}

type HeroSeriesType = {
    available: number
    collectionURI: string
    items: HeroSeriesItemType[]
    returned: number
}

type HeroStoriesItemType = {
    resourceURI: string
    name: string
    type: string
}

type HeroStoriesType = {
    available: number
    collectionURI: string
    items: HeroStoriesItemType[]
    returned: number
}

type HeroEventsItemType = {
    resourceURI: string
    name: string
}

type HeroEventsType = {
    available: number
    collectionURI: string
    items: HeroEventsItemType[]
    returned: number
}

type HeroUrlsType = {
    type: string
    url: string
}

export type HeroType = {
    id: number
    name: string
    votes: number
    description: string
    thumbnail?: HeroThumbnailType[]
    resourceURI?: string
    comics?: HeroComicsType[]
    series?: HeroSeriesType[]
    stories?: HeroStoriesType[]
    events?: HeroEventsType[]
    urls?: HeroUrlsType[]
};

export type HeroesListType = {
    results: HeroType[]
    offset: number
    limit: number
    total: number
    count: number
    page: number
    perPage: number
}

export type HeroesResponseType = {
    [key: string]: HeroesListType
}

export type HeroVotedType = {
    id: number
    hero_id: number
    votes: number
    created_at: string
    updated_at: string
}

export type VoteHeroResponse = {
    voted: boolean
    data: HeroVotedType
}

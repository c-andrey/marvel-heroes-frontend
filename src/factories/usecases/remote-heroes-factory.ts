import { RemoteHeroes } from "@/services/heroes/remote-heroes.service";
import { makeApiUrl } from "../http/api-url-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";

export const makeRemoteHeroes = (): RemoteHeroes => {
    return new RemoteHeroes(makeApiUrl('heroes'), makeAxiosHttpClient())
}
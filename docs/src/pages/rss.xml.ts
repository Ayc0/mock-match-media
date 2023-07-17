import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, SITE_BASE } from "../site_config";
import { getReleases } from "../lib/get-releases";

export async function get() {
    const releases = await getReleases();
    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: SITE_URL + SITE_BASE,
        items: releases.map((release) => ({
            title: release.name,
            pubDate: new Date(release.published_at),
            description: release.tag_name,
            link: release.html_url,
        })),
    });
}

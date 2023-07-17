interface GitHubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}
interface Release {
    url: string;
    assets_url: string;
    upload_url: string;
    html_url: string;
    id: number;
    author: GitHubUser;
    node_id: string;
    tag_name: string;
    target_commitish: string;
    name: string;
    draft: false;
    prerelease: false;
    created_at: string;
    published_at: string;
    assets: unknown[];
    tarball_url: string;
    zipball_url: string;
    body: string;
}

export const getReleases = async () => {
    try {
        const response = await fetch("https://api.github.com/repos/Ayc0/mock-match-media/releases");
        const releases = (await response.json()) as Release[];

        return releases;
    } catch (e) {
        console.error(e);
        return [];
    }
};

interface BaseXMLOptions {
    format: "atom" | "html" | "xml";
}

interface BaseJSONOptions {
    format?: "json";
}

interface BaseSearchOptions {
    tags?: string;
    random?: boolean;
    page?: number;
}

export type XMLSearchOptions = BaseSearchOptions & BaseXMLOptions;
export type JSONSearchOptions = BaseJSONOptions & BaseSearchOptions;
export type SearchOptions = JSONSearchOptions | XMLSearchOptions;

interface BaseMD5Options {
    md5: string;
}

export type XMLMD5Options = BaseMD5Options & { format: Exclude<SearchOptions["format"], "atom"> };
export type JSONMD5Options = BaseJSONOptions & BaseMD5Options;
export type MD5Options = JSONMD5Options | XMLMD5Options;

export type Options = MD5Options | SearchOptions;
export type Result<O extends Options> = O extends BaseXMLOptions
    ? string
    : O extends MD5Options
        ? Post
        : Post[];

export interface Post {
    id: number;
    uploader_id: number;
    approver_id: number;
    tag_string: string;
    tag_string_general: string;
    tag_string_artist:	string;
    tag_string_copyright: string;
    tag_string_character: string;
    tag_string_meta: string;
    rating: "e" | "g" | "q" | "s" | null;
    parent_id: number | null;
    source: string;
    md5: string;
    file_url: string;
    large_view_url: string;
    preview_file_url: string;
    file_ext: string;
    file_size: number;
    image_width: number;
    score: number;
    fav_count: number;
    tag_count_general: number;
    tag_count_artist: number;
    tag_count_copyright: number;
    tag_count_character: number;
    tag_count_meta: number;
    last_comment_bumped_at: string | null;
    last_noted_at: string | null;
    has_children: boolean;
    image_height: number;
    created_at: string;
    updated_at: string;
}

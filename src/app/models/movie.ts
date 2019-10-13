import { Language } from './language';

export interface Movie {
id : string;
title : string;
overview : string;
poster_path : string;
budget : string;
release_date : string;
revenue : string;
vote_average: string;
vote_count: string;
spoken_languages: Language [];
}

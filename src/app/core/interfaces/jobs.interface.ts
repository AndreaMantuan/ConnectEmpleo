export interface jobsResponse {
    status:     string;
    request_id: string;
    parameters: Parameters;
    data:       Datum[];
}

export interface Datum {
    job_id:                               string;
    employer_name:                        string;
    employer_logo:                        null | string;
    employer_website:                     null | string;
    employer_company_type:                null | string;
    job_publisher:                        string;
    job_employment_type:                  JobEmploymentType;
    job_title:                            string;
    job_apply_link:                       string;
    job_apply_is_direct:                  boolean;
    job_apply_quality_score:              number;
    apply_options:                        ApplyOption[];
    job_description:                      string;
    job_is_remote:                        boolean;
    job_posted_at_timestamp:              number;
    job_posted_at_datetime_utc:           Date;
    job_city:                             null | string;
    job_state:                            null | string;
    job_country:                          JobCountry;
    job_latitude:                         number;
    job_longitude:                        number;
    job_benefits:                         string[] | null;
    job_google_link:                      string;
    job_offer_expiration_datetime_utc:    Date | null;
    job_offer_expiration_timestamp:       number | null;
    job_required_experience:              JobRequiredExperience;
    job_required_skills:                  string[] | null;
    job_required_education:               JobRequiredEducation;
    job_experience_in_place_of_education: boolean;
    job_min_salary:                       number | null;
    job_max_salary:                       number | null;
    job_salary_currency:                  null | string;
    job_salary_period:                    null | string;
    job_highlights:                       JobHighlights;
    job_job_title:                        null | string;
    job_posting_language:                 JobPostingLanguage;
    job_onet_soc:                         string;
    job_onet_job_zone:                    string;
    job_occupational_categories:          string[] | null;
    job_naics_code:                       null | string;
    job_naics_name:                       null | string;
}

export interface ApplyOption {
    publisher:  string;
    apply_link: string;
    is_direct:  boolean;
}

export enum JobCountry {
    Us = "US",
}

export enum JobEmploymentType {
    Fulltime = "FULLTIME",
}

export interface JobHighlights {
    Qualifications:   string[];
    Responsibilities: string[];
    Benefits?:        string[];
}

export enum JobPostingLanguage {
    En = "en",
}

export interface JobRequiredEducation {
    postgraduate_degree:                  boolean;
    professional_certification:           boolean;
    high_school:                          boolean;
    associates_degree:                    boolean;
    bachelors_degree:                     boolean;
    degree_mentioned:                     boolean;
    degree_preferred:                     boolean;
    professional_certification_mentioned: boolean;
}

export interface JobRequiredExperience {
    no_experience_required:        boolean;
    required_experience_in_months: number | null;
    experience_mentioned:          boolean;
    experience_preferred:          boolean;
}

export interface Parameters {
    query:     string;
    page:      number;
    num_pages: number;
}


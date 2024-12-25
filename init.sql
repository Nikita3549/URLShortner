CREATE TABLE IF NOT EXISTS public.url
(
    short_url character varying COLLATE pg_catalog."default" NOT NULL,
    full_url character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT url_pkey PRIMARY KEY (short_url)
);

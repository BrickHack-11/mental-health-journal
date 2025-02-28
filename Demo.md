# Ollama
![image](https://github.com/user-attachments/assets/cab5d8e7-6ea5-4d50-b848-f89d98aab274)

# pgadmin 4
- `CREATE TABLE IF NOT EXISTS public."User"
(
    id integer NOT NULL DEFAULT nextval('"User_id_seq"'::regclass),
    fname character varying(100) COLLATE pg_catalog."default" NOT NULL,
    lname character varying(100) COLLATE pg_catalog."default" NOT NULL,
    birthdate date NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    gender character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY (id),
    CONSTRAINT "User_email_key" UNIQUE (email)
)`   
- `CREATE TABLE IF NOT EXISTS public.journal_entry
(
    id integer NOT NULL DEFAULT nextval('journal_entry_id_seq'::regclass),
    u_id integer NOT NULL,
    date_time timestamp without time zone NOT NULL,
    log_entry text COLLATE pg_catalog."default" NOT NULL,
    sleep_quality text COLLATE pg_catalog."default",
    sentiment text COLLATE pg_catalog."default",
    responses text[] COLLATE pg_catalog."default",
    mood text COLLATE pg_catalog."default",
    contribution text COLLATE pg_catalog."default",
    CONSTRAINT journal_entry_pkey PRIMARY KEY (id),
    CONSTRAINT journal_entry_u_id_fkey FOREIGN KEY (u_id)
        REFERENCES public."User" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)` 

# backend
![image](https://github.com/user-attachments/assets/ba7d6824-e87b-462e-a7ea-460311d721c7)

# Frontend
![image](https://github.com/user-attachments/assets/9f0210cd-5851-4f2e-be89-b2ef987803d2)


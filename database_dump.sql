PGDMP      
                }            isd_final_db    17.4    17.4 #    ▀           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            α           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            ß           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            Γ           1262    32951    isd_final_db    DATABASE     r   CREATE DATABASE isd_final_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'mn-MN';
    DROP DATABASE isd_final_db;
                     postgres    false            ▄            1259    32972 
   menu_items    TABLE     U  CREATE TABLE public.menu_items (
    id integer NOT NULL,
    item_name character varying(100) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    image_url character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.menu_items;
       public         heap r       postgres    false            █            1259    32971    menu_items_id_seq    SEQUENCE     ë   CREATE SEQUENCE public.menu_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.menu_items_id_seq;
       public               postgres    false    220            π           0    0    menu_items_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.menu_items_id_seq OWNED BY public.menu_items.id;
          public               postgres    false    219            α            1259    32991    order_items    TABLE     î   CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    menu_item_id integer,
    quantity integer NOT NULL
);
    DROP TABLE public.order_items;
       public         heap r       postgres    false            ▀            1259    32990    order_items_id_seq    SEQUENCE     è   CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.order_items_id_seq;
       public               postgres    false    224            Σ           0    0    order_items_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;
          public               postgres    false    223            ▐            1259    32983    orders    TABLE     O  CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    total_price numeric(10,2) NOT NULL,
    delivery_method character varying(50) NOT NULL,
    address character varying(200),
    payment_method character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.orders;
       public         heap r       postgres    false            ▌            1259    32982 
   orders_id_seq    SEQUENCE     à   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public               postgres    false    222            σ           0    0 
   orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public               postgres    false    221            ┌            1259    32963    users    TABLE     ▐   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    is_admin boolean DEFAULT false
);
    DROP TABLE public.users;
       public         heap r       postgres    false            ┘            1259    32962    users_id_seq    SEQUENCE     ä   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    218            µ           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    217            2           2604    32975 
   menu_items id    DEFAULT     n   ALTER TABLE ONLY public.menu_items ALTER COLUMN id SET DEFAULT nextval('public.menu_items_id_seq'::regclass);
 <   ALTER TABLE public.menu_items ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219    220            7           2604    32994    order_items id    DEFAULT     p   ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);
 =   ALTER TABLE public.order_items ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223    224            5           2604    32986 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            0           2604    32966    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217    218            ╪          0    32972 
   menu_items 
   TABLE DATA           j   COPY public.menu_items (id, item_name, description, price, image_url, created_at, updated_at) FROM stdin;
    public               postgres    false    220            ▄          0    32991    order_items 
   TABLE DATA           K   COPY public.order_items (id, order_id, menu_item_id, quantity) FROM stdin;
    public               postgres    false    224            ┌          0    32983    orders 
   TABLE DATA           p   COPY public.orders (id, user_id, total_price, delivery_method, address, payment_method, created_at) FROM stdin;
    public               postgres    false    222            ╓          0    32963    users 
   TABLE DATA           D   COPY public.users (id, name, email, password, is_admin) FROM stdin;
    public               postgres    false    218            τ           0    0    menu_items_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.menu_items_id_seq', 6, true);
          public               postgres    false    219            Φ           0    0    order_items_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.order_items_id_seq', 4, true);
          public               postgres    false    223            Θ           0    0 
   orders_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.orders_id_seq', 2, true);
          public               postgres    false    221            Ω           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public               postgres    false    217            =           2606    32981    menu_items menu_items_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT menu_items_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.menu_items DROP CONSTRAINT menu_items_pkey;
       public                 postgres    false    220            A           2606    32996    order_items order_items_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_pkey;
       public                 postgres    false    224            ?           2606    32989    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public                 postgres    false    222            9           2606    32970    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    218            ;           2606    32968    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            B           2606    33002 )   order_items order_items_menu_item_id_fkey 
   FK CONSTRAINT     ñ   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_menu_item_id_fkey FOREIGN KEY (menu_item_id) REFERENCES public.menu_items(id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_menu_item_id_fkey;
       public               postgres    false    224    4669    220            C           2606    32997 %   order_items order_items_order_id_fkey 
   FK CONSTRAINT     ÿ   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_order_id_fkey;
       public               postgres    false    224    222    4671            ╪   ¡   x£Ñ═╗é0åß∙∩U╘α`iσ0èq6qu)≡SÜ`i┌0└╒ïuara·Æτ▐«│SΦαåún⌡4{┌ ÷┤	zù%$·-·Σç▒5
X╩Dö≥ê¥)╦*┴¬¼îï<τ£²╣çç^W	⌡ÇΦj╤Ztô╤╘.÷▒@ZεNúç┌io┌;4φ░═╫╪>Φ@ΦO9╩n╦í¿Æ«CC} ╛∩:╨y┼äÉ÷goπ      ▄   
   x£ï╤πΓΓ ┼ ⌐      ┌   ]   x£3Σ4Σ44╒│4τLI═╔,K-¬Σ442V≡M╠╠S.)JM-ßLN,Jß4202╒50╤54W04░26░20╫3╢02╢┤Σ2"╧cÉªåfåµª\1z\\\ íª!╠      ╓   ¬   x£M╠;é0  ╨╣=àsí%▄D1jL@Dê`╤JU>O»ú█¢T▌┌ë½?╠┘;ù≈åíRIáæB├åµ╡{;│>}Nù5R▄0Wƒ═┴1Ñ-ú*╔bK▌∞┤*╝╙i╚A	("τWÖ≤µ┐cε╫ç'VÉXy¬Ω¥Φ7Cσ½µv·k7öb╒¿Æ┼ç≈qTdMî.Üé₧ä≡┬∞8     

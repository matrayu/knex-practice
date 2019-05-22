INSERT INTO shopping_list (name, price, category, checked, date_added)
VALUES
    ('Fish tricks', 13.10, 'Main',              false,  now() - '21 days'::INTERVAL),
    ('Not Dogs', 4.99, 'Snack',                 true,   now() - '21 days'::INTERVAL),
    ('Bluffalo Wings', 5.50, 'Snack',           false,  now() - '21 days'::INTERVAL),
    ('SubstiTuna Salad', 1.24, 'Lunch',         false,  now() - '21 days'::INTERVAL),
    ('Tofurkey', 2.50, 'Breakfast',             false,  now() - '21 days'::INTERVAL),
    ('Pretenderloins', 9.99, 'Main',            false,  now() - '9 days'::INTERVAL),
    ('Steak-believe', 6.00, 'Main',             false,  now() - '9 days'::INTERVAL),
    ('Kale Seitan', 6.67, 'Breakfast',          false,  now() - '9 days'::INTERVAL),
    ('NoBull Burger', 2.00, 'Snack',            false,  now() - '9 days'::INTERVAL),
    ('Turnip the Beet', 0.20, 'Lunch',          true,   now() - '9 days'::INTERVAL),
    ('Mascarphony', 1.80, 'Lunch',              true,   now() - '7 days'::INTERVAL),
    ('Burgatory', 1.50, 'Main',                 false,  now() - '7 days'::INTERVAL),
    ('Sleight of Ham', 3.10, 'Lunch',           false,  now() - '5 days'::INTERVAL),
    ('Antichovies', 1.00, 'Breakfast',          false,  now() - '5 days'::INTERVAL),
    ('Lettuce B. Frank', 0.86, 'Lunch',         true,   now() - '5 days'::INTERVAL),
    ('Pepperphony', 1.40, 'Breakfast',          false,  now() - '5 days'::INTERVAL),
    ('Shamburger', 3.50, 'Main',                false,  now() - '4 days'::INTERVAL),
    ('Facon', 1.90, 'Breakfast',                false,  now() - '4 days'::INTERVAL),
    ('Salami-get-this-straight', 3.00, 'Snack', false,  now() - '4 days'::INTERVAL),
    ('Mi-steak', 7.67, 'Main',                  false,  now() - '3 days'::INTERVAL),
    ('Ghost Beef', 4.33, 'Main',                false,  now() - '3 days'::INTERVAL),
    ('Cheatloaf', 5.00, 'Main',                 false,  now() - '3 days'::INTERVAL),
    ('Fried Trickin', 6.40, 'Snack',            false,  now() - '3 days'::INTERVAL),
    ('Salmock', 7.16, 'Breakfast',              false,  now() - '3 days'::INTERVAL),
    ('Leaf Stroganoff', 6.80, 'Main',           false,  now() - '2 days'::INTERVAL),
    ('Chicken Noodle Spoof', 2.50, 'Lunch',     false,  now() - '2 days'::INTERVAL),
    ('Pep-parody Pizza', 4.00, 'Lunch',         false,  now() - '2 days'::INTERVAL),
    ('Arti-fish-al pie', 8.40, 'Main',          false,  now() - '1 days'::INTERVAL),
    ('Bolphony sandwiches', 2.10, 'Lunch',      false,  now()),
    ('Chili non-carne', 5.88, 'Main',           true,   now()),
    ('Don''t go bacon my heart', 4.20, 'Main',  false,  now())
;


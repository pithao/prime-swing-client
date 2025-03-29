-------------------------------------------------------
--------------------------------------------------
-- START FROM SCRATCH:
DROP TRIGGER IF EXISTS "on_user_update" ON "user";
DROP TABLE IF EXISTS "user";


-------------------------------------------------------
--------------------------------------------------
-- TABLE SCHEMAS:


CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  username VARCHAR (80) UNIQUE NOT NULL,
  password VARCHAR (1000) NOT NULL,
  inserted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "class_survey" (
    id SERIAL PRIMARY KEY,
    anonymous BOOLEAN NOT NULL DEFAULT TRUE,
    name VARCHAR(255),
    email VARCHAR(255),
    contact_permission BOOLEAN NOT NULL DEFAULT FALSE,
    dancer_role VARCHAR(50),
    age INT,
    gender VARCHAR(50),
    zip_code VARCHAR(10),
    class_feedback TEXT,
    class_improvement TEXT,
    lead_instructor_comments TEXT,
    follow_instructor_comments TEXT,
    additional_topics TEXT,
    general_comments TEXT,
    satisfaction_rating INT CHECK (satisfaction_rating BETWEEN 1 AND 5),
    lead_instructor_rating INT CHECK (lead_instructor_rating BETWEEN 1 AND 5),
    follow_instructor_rating INT CHECK (follow_instructor_rating BETWEEN 1 AND 5),
    retake_likelihood INT CHECK (retake_likelihood BETWEEN 1 AND 5),
    material_satisfaction INT CHECK (material_satisfaction BETWEEN 1 AND 5),
    location_satisfaction INT CHECK (location_satisfaction BETWEEN 1 AND 5),
    schedule_satisfaction INT CHECK (schedule_satisfaction BETWEEN 1 AND 5),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "event_survey" (
    id SERIAL PRIMARY KEY,
    anonymous BOOLEAN NOT NULL DEFAULT TRUE,
    name VARCHAR(255),
    email VARCHAR(255),
    contact_permission BOOLEAN NOT NULL DEFAULT FALSE,
    dancer_role VARCHAR(50),
    age INT,
    gender VARCHAR(50),
    zip_code VARCHAR(10),
     event_satisfaction INT CHECK(event_satisfaction BETWEEN 1 AND 5),
    pro_rating INT CHECK(pro_rating BETWEEN 1 AND 5),
    dj_rating INT CHECK(dj_rating BETWEEN 1 AND 5),
    workshop_rating INT CHECK(workshop_rating BETWEEN 1 AND 5),
    recommendation_likelihood INT CHECK(recommendation_likelihood BETWEEN 1 AND 5),
    workshop_satisfaction INT CHECK(workshop_satisfaction BETWEEN 1 AND 5),
    location_satisfaction INT CHECK(location_satisfaction BETWEEN 1 AND 5),
    schedule_satisfaction INT CHECK(schedule_satisfaction BETWEEN 1 AND 5),
    event_feedback TEXT,
    event_improvement TEXT,
    pro_comments TEXT,
    dance_comments TEXT,
    workshop_comments TEXT,
    dj_comments TEXT,
    additional_workshops TEXT,
    general_comments TEXT,
    dances_attended TEXT,
    workshops_attended TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "dance_survey" (
    id SERIAL PRIMARY KEY,
    anonymous BOOLEAN DEFAULT TRUE,
    name VARCHAR(255),
    email VARCHAR(255),
    contact_permission BOOLEAN DEFAULT FALSE,
    dancer_role VARCHAR(50),
    age INT,
    gender VARCHAR(50),
    zip_code VARCHAR(20),
    dance_feedback TEXT,
    dance_improvement TEXT,
    lesson_comments TEXT,
    dj_comments TEXT,
    general_comments TEXT,
    satisfaction_rating INT CHECK (satisfaction_rating BETWEEN 1 AND 5),
    instructor_rating INT CHECK (instructor_rating BETWEEN 1 AND 5),
    lesson_satisfaction_rating INT CHECK (lesson_satisfaction_rating BETWEEN 1 AND 5),
    recommendation_likelihood INT CHECK (recommendation_likelihood BETWEEN 1 AND 5),
    dj_satisfaction_rating INT CHECK (dj_satisfaction_rating BETWEEN 1 AND 5),
    location_satisfaction_rating INT CHECK (location_satisfaction_rating BETWEEN 1 AND 5),
    schedule_satisfaction_rating INT CHECK (schedule_satisfaction_rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



SELECT * FROM "class_survey";

INSERT INTO class_survey (
   id SERIAL, anonymous, name, email, contact_permission, dancer_role, age, gender, zip_code, 
    class_feedback, class_improvement, lead_instructor_comments, follow_instructor_comments, 
    additional_topics, general_comments, satisfaction_rating, lead_instructor_rating, 
    follow_instructor_rating, retake_likelihood, material_satisfaction, 
    location_satisfaction, schedule_satisfaction
) VALUES (
    TRUE, NULL, NULL, FALSE, 'Lead', 25, 'Non-binary', '12345', 
    'Great class! I learned a lot.', 'More advanced variations.', 
    'Very engaging instructor.', 'Could give more individual feedback.', 
    'Musicality in dancing.', 'Loved the energy!', 5, 4, 
    4, 5, 5, 
    4, 5
);

INSERT INTO class_survey (
    id, anonymous, name, email, contact_permission, dancer_role, age, gender, zip_code, 
    class_feedback, class_improvement, lead_instructor_comments, follow_instructor_comments, 
    additional_topics, general_comments, satisfaction_rating, lead_instructor_rating, 
    follow_instructor_rating, retake_likelihood, material_satisfaction, 
    location_satisfaction, schedule_satisfaction, submitted_at
) VALUES (
    3, TRUE, NULL, NULL, FALSE, 'Lead', 25, 'Non-binary', '12345', 
    'Great class! I learned a lot.', 'More advanced variations.', 
    'Very engaging instructor.', 'Could give more individual feedback.', 
    'Musicality in dancing.', 'Loved the energy!', 5, 4, 
    4, 5, 5, 
    4, 5, CURRENT_TIMESTAMP
);

SELECT * FROM "event_survey";

INSERT INTO event_survey (
    anonymous, name, email, contact_permission, dancer_role, age, gender, zip_code, 
    event_satisfaction, pro_rating, dj_rating, workshop_rating, recommendation_likelihood, 
    workshop_satisfaction, location_satisfaction, schedule_satisfaction, event_feedback, 
    event_improvement, pro_comments, dance_comments, workshop_comments, dj_comments, 
    additional_workshops, general_comments, dances_attended, workshops_attended
) 
VALUES (
    False, -- anonymous
    'Jane Doe', -- name
    'janedoe@example.com', -- email
    TRUE, -- contact_permission
    'Lead', -- dancer_role
    30, -- age
    'Male', -- gender
    '12345', -- zip_code
    5, -- event_satisfaction
    4, -- pro_rating
    5, -- dj_rating
    4, -- workshop_rating
    5, -- recommendation_likelihood
    4, -- workshop_satisfaction
    5, -- location_satisfaction
    4, -- schedule_satisfaction
    'Great event overall!', -- event_feedback
    'More seating would be nice.', -- event_improvement
    'The professionals were amazing.', -- pro_comments
    'Loved the dance styles!', -- dance_comments
    'Workshops were informative.', -- workshop_comments
    'The DJ kept the energy high.', -- dj_comments
    'Would love a solo jazz class.', -- additional_workshops
    'Looking forward to next year!', -- general_comments
    'Lindy Hop Night, Blues Social', -- dances_attended
    'Swing Out Basics, Charleston Variations' -- workshops_attended
);


INSERT INTO dance_survey (
    anonymous, name, email, contact_permission, dancer_role, age, gender, zip_code, 
    dance_feedback, dance_improvement, lesson_comments, dj_comments, general_comments, 
    satisfaction_rating, instructor_rating, lesson_satisfaction_rating, recommendation_likelihood, 
    dj_satisfaction_rating, location_satisfaction_rating, schedule_satisfaction_rating
) VALUES (
    TRUE, NULL, NULL, FALSE, 'Leader', 25, 'Male', '12345', 
    'Great experience!', 'More advanced lessons would be nice.', 'Instructor was engaging.', 
    'DJ played great music.', 'Would love to see more social events.', 
    4, 5, 4, 5, 4, 3, 5
);


SELECT * FROM "dance_survey";


-------------------------------------------------------
--------------------------------------------------
-- SEED DATA:
--   You'll need to actually register users via the application in order to get hashed
--   passwords. Once you've done that, you can modify this INSERT statement to include
--   your dummy users. Be sure to copy/paste their hashed passwords, as well.
--   This is only for development purposes! Here's a commented-out example:
-- INSERT INTO "user"
--   ("username", "password")
--   VALUES
--   ('unicorn10', '$2a$10$oGi81qjXmTh/slGzYOr2fu6NGuCwB4kngsiWQPToNrZf5X8hxkeNG'), --pw: 123
--   ('cactusfox', '$2a$10$8./c/6fB2BkzdIrAUMWOxOlR75kgmbx/JMrMA5gA70c9IAobVZquW'); --pw: 123


-------------------------------------------------------
--------------------------------------------------
-- AUTOMAGIC UPDATED_AT:

-- Did you know that you can make and execute functions
-- in PostgresQL? Wild, right!? I'm not making this up. Here
-- is proof that I am not making this up:
  -- https://x-team.com/blog/automatic-timestamps-with-postgresql/

-- Create a function that sets a row's updated_at column
-- to NOW():
CREATE OR REPLACE FUNCTION set_updated_at_to_now() -- 👈
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on the user table that will execute
-- the set_update_at_to_now function on any rows that
-- have been touched by an UPDATE query:
CREATE TRIGGER on_user_update
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();

# 🧪 PlantSage AI Unified Automated Test Verification Dashboard

This dashboard displays the consolidated test results verified from the completed test execution reports for the Website, Mobile App, and Backend.

## 📊 Consolidated Test Executive Summary

| Component | Test Suite | Total Tests | Passed | Failed | Pass Rate | Duration | Timestamp |
|---|---|---|---|---|---|---|---|
| Website E2E | PlantSage AI - Full E2E Workflow | 136 | ✅ 136 | ❌ 0 | **100%** | 25s | 2026-06-11T07:48:13.214066+00:00Z |
| Website Security | PlantSage AI Backend Security Verification | 28 | ✅ 28 | ❌ 0 | **100%** | 87.32s | 2026-06-11T06:24:45.900672+00:00Z |
| Mobile E2E | PlantSage AI Web App - Full E2E Workflow | 126 | ✅ 126 | ❌ 0 | **100%** | 165.17s | 2026-06-11T05:53:57.371582Z |
| Mobile Security | PlantSage AI Backend Security Verification | 28 | ✅ 28 | ❌ 0 | **100%** | 87.32s | 2026-06-11T06:24:45.900672+00:00Z |
| Backend API & ML | PlantSage AI - Backend & ML API | 15 | ✅ 15 | ❌ 0 | **100%** | 5.0s | 2026-06-18T03:48:50Z |


### 📋 Website E2E Test Cases Detail Breakdowns
<details><summary>Click to view all 136 Website E2E Test Cases</summary>

| No. | Category | Test Name | Status |
|---|---|---|---|
| 1 | Home Screen | `test_001_home_title_page` | ✅ PASSED |
| 2 | Home Screen | `test_002_home_hero_heading` | ✅ PASSED |
| 3 | Home Screen | `test_003_home_hero_subheading` | ✅ PASSED |
| 4 | Home Screen | `test_004_home_hero_badge_plantsage_visible` | ✅ PASSED |
| 5 | Home Screen | `test_005_home_hero_badge_leaf_icon` | ✅ PASSED |
| 6 | Home Screen | `test_006_home_identify_btn_visible` | ✅ PASSED |
| 7 | Home Screen | `test_007_home_identify_btn_text` | ✅ PASSED |
| 8 | Home Screen | `test_008_home_identify_btn_camera_icon` | ✅ PASSED |
| 9 | Home Screen | `test_009_home_symptom_btn_visible` | ✅ PASSED |
| 10 | Home Screen | `test_010_home_symptom_btn_text` | ✅ PASSED |
| 11 | Home Screen | `test_011_home_symptom_btn_search_icon` | ✅ PASSED |
| 12 | Home Screen | `test_012_home_trust_badge_ayush_visible` | ✅ PASSED |
| 13 | Home Screen | `test_013_home_trust_badge_doctor_visible` | ✅ PASSED |
| 14 | Home Screen | `test_014_home_trust_badge_species_count_visible` | ✅ PASSED |
| 15 | Home Screen | `test_015_home_featured_plants_heading_visible` | ✅ PASSED |
| 16 | Home Screen | `test_016_home_featured_plants_view_all_link` | ✅ PASSED |
| 17 | Home Screen | `test_017_home_featured_plants_cards_visible` | ✅ PASSED |
| 18 | Home Screen | `test_018_home_featured_plant_verified_badges` | ✅ PASSED |
| 19 | Home Screen | `test_019_home_quick_remedies_heading_visible` | ✅ PASSED |
| 20 | Home Screen | `test_020_home_quick_remedy_pill_cold_cough_visible` | ✅ PASSED |
| 21 | Home Screen | `test_021_home_quick_remedy_pill_headache_visible` | ✅ PASSED |
| 22 | Home Screen | `test_022_home_quick_remedy_pill_digestion_visible` | ✅ PASSED |
| 23 | Home Screen | `test_023_home_quick_remedy_pill_skin_issues_visible` | ✅ PASSED |
| 24 | Home Screen | `test_024_home_quick_remedy_pill_stress_visible` | ✅ PASSED |
| 25 | Home Screen | `test_025_home_quick_remedy_pill_immunity_visible` | ✅ PASSED |
| 26 | Navigation & Layout | `test_026_nav_header_visible` | ✅ PASSED |
| 27 | Navigation & Layout | `test_027_nav_logo_text_visible` | ✅ PASSED |
| 28 | Navigation & Layout | `test_028_nav_logo_leaf_icon_visible` | ✅ PASSED |
| 29 | Navigation & Layout | `test_029_nav_link_home_visible` | ✅ PASSED |
| 30 | Navigation & Layout | `test_030_nav_link_identify_visible` | ✅ PASSED |
| 31 | Navigation & Layout | `test_031_nav_link_search_visible` | ✅ PASSED |
| 32 | Navigation & Layout | `test_032_nav_link_garden_visible` | ✅ PASSED |
| 33 | Navigation & Layout | `test_033_nav_link_saved_locations_visible` | ✅ PASSED |
| 34 | Navigation & Layout | `test_034_nav_link_encyclopedia_visible` | ✅ PASSED |
| 35 | Navigation & Layout | `test_035_nav_theme_toggle_visible` | ✅ PASSED |
| 36 | Navigation & Layout | `test_036_nav_theme_toggle_clicks` | ✅ PASSED |
| 37 | Navigation & Layout | `test_037_nav_footer_visible` | ✅ PASSED |
| 38 | Navigation & Layout | `test_038_nav_footer_text_sih_ayush_visible` | ✅ PASSED |
| 39 | Navigation & Layout | `test_039_nav_footer_link_about_visible` | ✅ PASSED |
| 40 | Navigation & Layout | `test_040_nav_footer_link_encyclopedia_visible` | ✅ PASSED |
| 41 | Identify Page | `test_041_identify_navigates_correctly` | ✅ PASSED |
| 42 | Identify Page | `test_042_identify_header_title` | ✅ PASSED |
| 43 | Identify Page | `test_043_identify_camera_placeholder_icon` | ✅ PASSED |
| 44 | Identify Page | `test_044_identify_camera_placeholder_title` | ✅ PASSED |
| 45 | Identify Page | `test_045_identify_disclaimer_subtitle` | ✅ PASSED |
| 46 | Identify Page | `test_046_identify_capture_live_button` | ✅ PASSED |
| 47 | Identify Page | `test_047_identify_from_gallery_button` | ✅ PASSED |
| 48 | Identify Page | `test_048_identify_tta_toggle_available` | ✅ PASSED |
| 49 | Identify Page | `test_049_identify_non_plant_upload_error_modal` | ✅ PASSED |
| 50 | Identify Page | `test_050_identify_non_plant_modal_close` | ✅ PASSED |
| 51 | Identify Page | `test_051_identify_valid_plant_upload_flow` | ✅ PASSED |
| 52 | Identify Page | `test_052_identify_result_modal_opens` | ✅ PASSED |
| 53 | Identify Page | `test_053_identify_result_modal_shows_match_percentage` | ✅ PASSED |
| 54 | Identify Page | `test_054_identify_result_modal_shows_plant_name` | ✅ PASSED |
| 55 | Identify Page | `test_055_identify_result_modal_shows_scientific_name` | ✅ PASSED |
| 56 | Identify Page | `test_056_identify_result_modal_shows_ayush_badge` | ✅ PASSED |
| 57 | Identify Page | `test_057_identify_result_modal_shows_care_level` | ✅ PASSED |
| 58 | Identify Page | `test_058_identify_result_modal_view_details_button` | ✅ PASSED |
| 59 | Identify Page | `test_059_identify_result_modal_save_plant_button` | ✅ PASSED |
| 60 | Identify Page | `test_060_identify_result_modal_close_button` | ✅ PASSED |
| 61 | Search Page | `test_061_search_navigates_correctly` | ✅ PASSED |
| 62 | Search Page | `test_062_search_header_title` | ✅ PASSED |
| 63 | Search Page | `test_063_search_bar_input_placeholder` | ✅ PASSED |
| 64 | Search Page | `test_064_search_button_visible` | ✅ PASSED |
| 65 | Search Page | `test_065_search_quick_pill_cold_cough_click` | ✅ PASSED |
| 66 | Search Page | `test_066_search_quick_pill_headache_click` | ✅ PASSED |
| 67 | Search Page | `test_067_search_quick_pill_digestion_click` | ✅ PASSED |
| 68 | Search Page | `test_068_search_validation_empty_query` | ✅ PASSED |
| 69 | Search Page | `test_069_search_shows_typing_indicator` | ✅ PASSED |
| 70 | Search Page | `test_070_search_results_container_visible` | ✅ PASSED |
| 71 | Search Page | `test_071_search_result_item_title` | ✅ PASSED |
| 72 | Search Page | `test_072_search_result_item_scientific_name` | ✅ PASSED |
| 73 | Search Page | `test_073_search_result_item_relevance_badge` | ✅ PASSED |
| 74 | Search Page | `test_074_search_result_item_how_it_helps` | ✅ PASSED |
| 75 | Search Page | `test_075_search_result_item_prep_method` | ✅ PASSED |
| 76 | Search Page | `test_076_search_result_item_quick_remedy` | ✅ PASSED |
| 77 | Search Page | `test_077_search_result_item_caution_alert` | ✅ PASSED |
| 78 | Search Page | `test_078_search_result_item_view_details_btn` | ✅ PASSED |
| 79 | Search Page | `test_079_search_result_item_details_navigation` | ✅ PASSED |
| 80 | Search Page | `test_080_search_no_results_placeholder` | ✅ PASSED |
| 81 | Garden Page | `test_081_garden_navigates_correctly` | ✅ PASSED |
| 82 | Garden Page | `test_082_garden_header_title` | ✅ PASSED |
| 83 | Garden Page | `test_083_garden_search_bar_visible` | ✅ PASSED |
| 84 | Garden Page | `test_084_garden_displays_plants_grid` | ✅ PASSED |
| 85 | Garden Page | `test_085_garden_plant_card_badges` | ✅ PASSED |
| 86 | Garden Page | `test_086_garden_search_filter_plant_exists` | ✅ PASSED |
| 87 | Garden Page | `test_087_garden_search_filter_plant_not_exists` | ✅ PASSED |
| 88 | Garden Page | `test_088_garden_plant_click_details_navigation` | ✅ PASSED |
| 89 | Garden Page | `test_089_garden_interactive_tab_swipe` | ✅ PASSED |
| 90 | Garden Page | `test_090_garden_bottom_nav_highlighted` | ✅ PASSED |
| 91 | Garden Page | `test_091_garden_care_filter_easy` | ✅ PASSED |
| 92 | Garden Page | `test_092_garden_care_filter_moderate` | ✅ PASSED |
| 93 | Garden Page | `test_093_garden_care_filter_difficult` | ✅ PASSED |
| 94 | Garden Page | `test_094_garden_toxicity_filter_safe` | ✅ PASSED |
| 95 | Garden Page | `test_095_garden_toxicity_filter_toxic` | ✅ PASSED |
| 96 | Garden Page | `test_096_garden_ayush_recognized_filter` | ✅ PASSED |
| 97 | Saved Locations | `test_097_saved_navigation` | ✅ PASSED |
| 98 | Saved Locations | `test_098_saved_header_title` | ✅ PASSED |
| 99 | Saved Locations | `test_099_saved_empty_state_visible` | ✅ PASSED |
| 100 | Saved Locations | `test_100_saved_plant_adds_to_list_from_identify` | ✅ PASSED |
| 101 | Saved Locations | `test_101_saved_plant_displays_scientific_name` | ✅ PASSED |
| 102 | Saved Locations | `test_102_saved_plant_displays_address` | ✅ PASSED |
| 103 | Saved Locations | `test_103_saved_plant_displays_date` | ✅ PASSED |
| 104 | Saved Locations | `test_104_saved_plant_detail_navigation` | ✅ PASSED |
| 105 | Saved Locations | `test_105_saved_plant_unsave_removes_item` | ✅ PASSED |
| 106 | Saved Locations | `test_106_saved_state_persists_in_localstorage` | ✅ PASSED |
| 107 | Encyclopedia | `test_107_encyclopedia_navigation` | ✅ PASSED |
| 108 | Encyclopedia | `test_108_encyclopedia_header_title` | ✅ PASSED |
| 109 | Encyclopedia | `test_109_encyclopedia_search_input` | ✅ PASSED |
| 110 | Encyclopedia | `test_110_encyclopedia_shows_all_plants` | ✅ PASSED |
| 111 | Encyclopedia | `test_111_encyclopedia_filter_by_family` | ✅ PASSED |
| 112 | Encyclopedia | `test_112_encyclopedia_filter_by_properties` | ✅ PASSED |
| 113 | Encyclopedia | `test_113_encyclopedia_plant_card_visible` | ✅ PASSED |
| 114 | Encyclopedia | `test_114_encyclopedia_plant_card_click` | ✅ PASSED |
| 115 | Encyclopedia | `test_115_encyclopedia_displays_ayush_badges` | ✅ PASSED |
| 116 | Encyclopedia | `test_116_encyclopedia_pagination_or_scroll` | ✅ PASSED |
| 117 | Herb Detail | `test_117_detail_navigation_with_id` | ✅ PASSED |
| 118 | Herb Detail | `test_118_detail_header_title` | ✅ PASSED |
| 119 | Herb Detail | `test_119_detail_botanical_name` | ✅ PASSED |
| 120 | Herb Detail | `test_120_detail_description` | ✅ PASSED |
| 121 | Herb Detail | `test_121_detail_ayush_doctor_badges` | ✅ PASSED |
| 122 | Herb Detail | `test_122_detail_parts_used_section` | ✅ PASSED |
| 123 | Herb Detail | `test_123_detail_home_remedies_list` | ✅ PASSED |
| 124 | Herb Detail | `test_124_detail_dosage_and_warnings` | ✅ PASSED |
| 125 | Herb Detail | `test_125_detail_learn_more_external_links` | ✅ PASSED |
| 126 | Herb Detail | `test_126_detail_back_button_works` | ✅ PASSED |
| 127 | About Page | `test_127_about_navigation` | ✅ PASSED |
| 128 | About Page | `test_128_about_hero_plantsage_badge` | ✅ PASSED |
| 129 | About Page | `test_129_about_hero_title_visible` | ✅ PASSED |
| 130 | About Page | `test_130_about_hero_subtitle_visible` | ✅ PASSED |
| 131 | About Page | `test_131_about_mission_card_visible` | ✅ PASSED |
| 132 | About Page | `test_132_about_badges_explanation_card` | ✅ PASSED |
| 133 | About Page | `test_133_about_safety_disclaimer_visible` | ✅ PASSED |
| 134 | About Page | `test_134_about_contact_section_visible` | ✅ PASSED |
| 135 | About Page | `test_135_about_version_text_visible` | ✅ PASSED |
| 136 | About Page | `test_136_about_links_back_home` | ✅ PASSED |

</details>

### 📋 Website Security Test Cases Detail Breakdowns
<details><summary>Click to view all 28 Website Security Test Cases</summary>

| No. | Category | Test Name | Status |
|---|---|---|---|
| 1 | Public Endpoints | `test_001_root_endpoint_public` | ✅ PASSED |
| 2 | Public Endpoints | `test_002_health_endpoint_public` | ✅ PASSED |
| 3 | Public Endpoints | `test_003_classes_endpoint_public` | ✅ PASSED |
| 4 | Authentication Requirements | `test_004_identify_base64_requires_auth` | ✅ PASSED |
| 5 | Authentication Requirements | `test_005_identify_upload_requires_auth` | ✅ PASSED |
| 6 | Authentication Requirements | `test_006_ai_plant_info_requires_auth` | ✅ PASSED |
| 7 | Authentication Requirements | `test_007_ai_symptom_search_requires_auth` | ✅ PASSED |
| 8 | Authentication Requirements | `test_008_ai_verify_plant_requires_auth` | ✅ PASSED |
| 9 | Authentication Requirements | `test_009_ai_verify_vision_requires_auth` | ✅ PASSED |
| 10 | Client Secret Bypass | `test_010_identify_base64_with_client_secret` | ✅ PASSED |
| 11 | Client Secret Bypass | `test_011_ai_plant_info_with_client_secret` | ✅ PASSED |
| 12 | Client Secret Bypass | `test_012_ai_symptom_search_with_client_secret` | ✅ PASSED |
| 13 | Client Secret Bypass | `test_013_ai_verify_plant_with_client_secret` | ✅ PASSED |
| 14 | Client Secret Bypass | `test_014_ai_verify_vision_with_client_secret` | ✅ PASSED |
| 15 | Auth & Session Management | `test_015_google_oauth_bypass_prevention` | ✅ PASSED |
| 16 | Auth & Session Management | `test_016_signup_password_too_short` | ✅ PASSED |
| 17 | Auth & Session Management | `test_017_signup_password_valid` | ✅ PASSED |
| 18 | Auth & Session Management | `test_018_signup_duplicate_email` | ✅ PASSED |
| 19 | Auth & Session Management | `test_019_login_invalid_credentials` | ✅ PASSED |
| 20 | Auth & Session Management | `test_020_login_successful` | ✅ PASSED |
| 21 | Auth & Session Management | `test_021_refresh_token_valid` | ✅ PASSED |
| 22 | Auth & Session Management | `test_022_refresh_token_invalid` | ✅ PASSED |
| 23 | Auth & Session Management | `test_023_logout_revokes_refresh_token` | ✅ PASSED |
| 24 | Auth & Session Management | `test_024_auth_me_protected` | ✅ PASSED |
| 25 | Input Validation & File Handling | `test_025_identify_upload_size_limit` | ✅ PASSED |
| 26 | Input Validation & File Handling | `test_026_identify_upload_mime_validation` | ✅ PASSED |
| 27 | Input Validation & File Handling | `test_027_prompt_injection_sanitization` | ✅ PASSED |
| 28 | Input Validation & File Handling | `test_028_exception_traceback_sanitization` | ✅ PASSED |

</details>

### 📋 Mobile E2E Test Cases Detail Breakdowns
<details><summary>Click to view all 126 Mobile E2E Test Cases</summary>

| No. | Category | Test Name | Status |
|---|---|---|---|
| 1 | Landing Page | `test_001_landing_loads_successfully` | ✅ PASSED |
| 2 | Landing Page | `test_002_landing_title_matches` | ✅ PASSED |
| 3 | Landing Page | `test_003_landing_brand_pill_visible` | ✅ PASSED |
| 4 | Landing Page | `test_004_landing_brand_pill_ayush` | ✅ PASSED |
| 5 | Landing Page | `test_005_landing_hero_title_visible` | ✅ PASSED |
| 6 | Landing Page | `test_006_landing_hero_subtitle_visible` | ✅ PASSED |
| 7 | Landing Page | `test_007_landing_theme_toggle_visible` | ✅ PASSED |
| 8 | Landing Page | `test_008_landing_profile_avatar_visible` | ✅ PASSED |
| 9 | Landing Page | `test_009_landing_stats_plants_counter` | ✅ PASSED |
| 10 | Landing Page | `test_010_landing_stats_models_counter` | ✅ PASSED |
| 11 | Landing Page | `test_011_landing_stats_ayush_counter` | ✅ PASSED |
| 12 | Landing Page | `test_012_landing_cta_identify_button_visible` | ✅ PASSED |
| 13 | Landing Page | `test_013_landing_cta_search_button_visible` | ✅ PASSED |
| 14 | Landing Page | `test_014_landing_featured_section_title` | ✅ PASSED |
| 15 | Landing Page | `test_015_landing_featured_view_all_button` | ✅ PASSED |
| 16 | Landing Page | `test_016_landing_featured_card_tulsi_visible` | ✅ PASSED |
| 17 | Landing Page | `test_017_landing_featured_card_ashwagandha_visible` | ✅ PASSED |
| 18 | Landing Page | `test_018_landing_featured_card_neem_visible` | ✅ PASSED |
| 19 | Landing Page | `test_019_landing_quick_remedies_title` | ✅ PASSED |
| 20 | Landing Page | `test_020_landing_quick_remedies_six_symptom_pills` | ✅ PASSED |
| 21 | Landing Page | `test_021_landing_bottom_nav_visible` | ✅ PASSED |
| 22 | Login Page | `test_022_login_navigation` | ✅ PASSED |
| 23 | Login Page | `test_023_login_welcome_header` | ✅ PASSED |
| 24 | Login Page | `test_024_login_email_input_visible` | ✅ PASSED |
| 25 | Login Page | `test_025_login_password_input_visible` | ✅ PASSED |
| 26 | Login Page | `test_026_login_button_visible` | ✅ PASSED |
| 27 | Login Page | `test_027_login_remember_me_checkbox` | ✅ PASSED |
| 28 | Login Page | `test_028_login_signup_link_visible` | ✅ PASSED |
| 29 | Login Page | `test_029_login_validation_empty_email` | ✅ PASSED |
| 30 | Login Page | `test_030_login_validation_empty_password` | ✅ PASSED |
| 31 | Login Page | `test_031_login_validation_invalid_email` | ✅ PASSED |
| 32 | Login Page | `test_032_login_error_invalid_credentials` | ✅ PASSED |
| 33 | Login Page | `test_033_login_toggle_password_visibility` | ✅ PASSED |
| 34 | Login Page | `test_034_login_successful_email_password` | ✅ PASSED |
| 35 | Login Page | `test_035_login_redirects_to_home` | ✅ PASSED |
| 36 | Login Page | `test_036_login_session_token_stored` | ✅ PASSED |
| 37 | Signup Page | `test_037_signup_navigation` | ✅ PASSED |
| 38 | Signup Page | `test_038_signup_header_visible` | ✅ PASSED |
| 39 | Signup Page | `test_039_signup_name_input_visible` | ✅ PASSED |
| 40 | Signup Page | `test_040_signup_email_input_visible` | ✅ PASSED |
| 41 | Signup Page | `test_041_signup_password_input_visible` | ✅ PASSED |
| 42 | Signup Page | `test_042_signup_button_visible` | ✅ PASSED |
| 43 | Signup Page | `test_043_signup_login_link_visible` | ✅ PASSED |
| 44 | Signup Page | `test_044_signup_validation_empty_name` | ✅ PASSED |
| 45 | Signup Page | `test_045_signup_validation_empty_email` | ✅ PASSED |
| 46 | Signup Page | `test_046_signup_validation_empty_password` | ✅ PASSED |
| 47 | Signup Page | `test_047_signup_validation_short_password` | ✅ PASSED |
| 48 | Signup Page | `test_048_signup_validation_invalid_email` | ✅ PASSED |
| 49 | Signup Page | `test_049_signup_existing_email_fails` | ✅ PASSED |
| 50 | Signup Page | `test_050_signup_successful_registration` | ✅ PASSED |
| 51 | Signup Page | `test_051_signup_redirects_to_home_with_session` | ✅ PASSED |
| 52 | Identify Page | `test_052_identify_navigation` | ✅ PASSED |
| 53 | Identify Page | `test_053_identify_header_title` | ✅ PASSED |
| 54 | Identify Page | `test_054_identify_camera_placeholder_icon` | ✅ PASSED |
| 55 | Identify Page | `test_055_identify_camera_placeholder_title` | ✅ PASSED |
| 56 | Identify Page | `test_056_identify_disclaimer_subtitle` | ✅ PASSED |
| 57 | Identify Page | `test_057_identify_capture_live_button` | ✅ PASSED |
| 58 | Identify Page | `test_058_identify_from_gallery_button` | ✅ PASSED |
| 59 | Identify Page | `test_059_identify_tta_toggle_available` | ✅ PASSED |
| 60 | Identify Page | `test_060_identify_non_plant_upload_error_modal` | ✅ PASSED |
| 61 | Identify Page | `test_061_identify_non_plant_modal_close` | ✅ PASSED |
| 62 | Identify Page | `test_062_identify_valid_plant_upload_flow` | ✅ PASSED |
| 63 | Identify Page | `test_063_identify_result_modal_opens` | ✅ PASSED |
| 64 | Identify Page | `test_064_identify_result_modal_shows_match_percentage` | ✅ PASSED |
| 65 | Identify Page | `test_065_identify_result_modal_shows_plant_name` | ✅ PASSED |
| 66 | Identify Page | `test_066_identify_result_modal_shows_scientific_name` | ✅ PASSED |
| 67 | Identify Page | `test_067_identify_result_modal_shows_ayush_badge` | ✅ PASSED |
| 68 | Identify Page | `test_068_identify_result_modal_shows_care_level` | ✅ PASSED |
| 69 | Identify Page | `test_069_identify_result_modal_view_details_button` | ✅ PASSED |
| 70 | Symptom Search | `test_070_search_navigation` | ✅ PASSED |
| 71 | Symptom Search | `test_071_search_header_title` | ✅ PASSED |
| 72 | Symptom Search | `test_072_search_input_visible` | ✅ PASSED |
| 73 | Symptom Search | `test_073_search_button_visible` | ✅ PASSED |
| 74 | Symptom Search | `test_074_search_quick_pill_cold_cough_click` | ✅ PASSED |
| 75 | Symptom Search | `test_075_search_quick_pill_headache_click` | ✅ PASSED |
| 76 | Symptom Search | `test_076_search_quick_pill_digestion_click` | ✅ PASSED |
| 77 | Symptom Search | `test_077_search_validation_empty_query` | ✅ PASSED |
| 78 | Symptom Search | `test_078_search_performs_backend_query_successfully` | ✅ PASSED |
| 79 | Symptom Search | `test_079_search_displays_results_list` | ✅ PASSED |
| 80 | Symptom Search | `test_080_search_result_item_title` | ✅ PASSED |
| 81 | Symptom Search | `test_081_search_result_item_botanical_name` | ✅ PASSED |
| 82 | Symptom Search | `test_082_search_result_item_relevance_score` | ✅ PASSED |
| 83 | Symptom Search | `test_083_search_result_item_how_it_helps` | ✅ PASSED |
| 84 | Symptom Search | `test_084_search_result_item_remedy` | ✅ PASSED |
| 85 | Symptom Search | `test_085_search_result_item_caution` | ✅ PASSED |
| 86 | Symptom Search | `test_086_search_click_navigates_to_detail` | ✅ PASSED |
| 87 | Symptom Search | `test_087_search_unknown_symptom_empty_state` | ✅ PASSED |
| 88 | Garden Page | `test_088_garden_navigation` | ✅ PASSED |
| 89 | Garden Page | `test_089_garden_header_title` | ✅ PASSED |
| 90 | Garden Page | `test_090_garden_search_bar_visible` | ✅ PASSED |
| 91 | Garden Page | `test_091_garden_displays_plants_grid` | ✅ PASSED |
| 92 | Garden Page | `test_092_garden_plant_card_badges` | ✅ PASSED |
| 93 | Garden Page | `test_093_garden_search_filter_plant_exists` | ✅ PASSED |
| 94 | Garden Page | `test_094_garden_search_filter_plant_not_exists` | ✅ PASSED |
| 95 | Garden Page | `test_095_garden_plant_click_details_navigation` | ✅ PASSED |
| 96 | Garden Page | `test_096_garden_interactive_tab_swipe` | ✅ PASSED |
| 97 | Garden Page | `test_097_garden_bottom_nav_highlighted` | ✅ PASSED |
| 98 | Saved Plants | `test_098_saved_navigation` | ✅ PASSED |
| 99 | Saved Plants | `test_099_saved_header_title` | ✅ PASSED |
| 100 | Saved Plants | `test_100_saved_empty_state_visible` | ✅ PASSED |
| 101 | Saved Plants | `test_101_saved_plant_adds_to_list_from_identify` | ✅ PASSED |
| 102 | Saved Plants | `test_102_saved_plant_displays_scientific_name` | ✅ PASSED |
| 103 | Saved Plants | `test_103_saved_plant_displays_address` | ✅ PASSED |
| 104 | Saved Plants | `test_104_saved_plant_displays_date` | ✅ PASSED |
| 105 | Saved Plants | `test_105_saved_plant_detail_navigation` | ✅ PASSED |
| 106 | Saved Plants | `test_106_saved_plant_unsave_removes_item` | ✅ PASSED |
| 107 | Saved Plants | `test_107_saved_state_persists_in_localstorage` | ✅ PASSED |
| 108 | Herb Detail | `test_108_detail_navigation_with_id` | ✅ PASSED |
| 109 | Herb Detail | `test_109_detail_header_title` | ✅ PASSED |
| 110 | Herb Detail | `test_110_detail_botanical_name` | ✅ PASSED |
| 111 | Herb Detail | `test_111_detail_description` | ✅ PASSED |
| 112 | Herb Detail | `test_112_detail_ayush_doctor_badges` | ✅ PASSED |
| 113 | Herb Detail | `test_113_detail_parts_used_section` | ✅ PASSED |
| 114 | Herb Detail | `test_114_detail_home_remedies_list` | ✅ PASSED |
| 115 | Herb Detail | `test_115_detail_dosage_and_warnings` | ✅ PASSED |
| 116 | Herb Detail | `test_116_detail_learn_more_external_links` | ✅ PASSED |
| 117 | Herb Detail | `test_117_detail_back_button_works` | ✅ PASSED |
| 118 | About Page | `test_118_about_navigation` | ✅ PASSED |
| 119 | About Page | `test_119_about_hero_plantsage_badge` | ✅ PASSED |
| 120 | About Page | `test_120_about_hero_title_visible` | ✅ PASSED |
| 121 | About Page | `test_121_about_hero_subtitle_visible` | ✅ PASSED |
| 122 | About Page | `test_122_about_mission_card_visible` | ✅ PASSED |
| 123 | About Page | `test_123_about_badges_explanation_card` | ✅ PASSED |
| 124 | About Page | `test_124_about_safety_disclaimer_visible` | ✅ PASSED |
| 125 | About Page | `test_125_about_contact_section_visible` | ✅ PASSED |
| 126 | About Page | `test_126_about_version_text_visible` | ✅ PASSED |

</details>

### 📋 Mobile Security Test Cases Detail Breakdowns
<details><summary>Click to view all 28 Mobile Security Test Cases</summary>

| No. | Category | Test Name | Status |
|---|---|---|---|
| 1 | Public Endpoints | `test_001_root_endpoint_public` | ✅ PASSED |
| 2 | Public Endpoints | `test_002_health_endpoint_public` | ✅ PASSED |
| 3 | Public Endpoints | `test_003_classes_endpoint_public` | ✅ PASSED |
| 4 | Authentication Requirements | `test_004_identify_base64_requires_auth` | ✅ PASSED |
| 5 | Authentication Requirements | `test_005_identify_upload_requires_auth` | ✅ PASSED |
| 6 | Authentication Requirements | `test_006_ai_plant_info_requires_auth` | ✅ PASSED |
| 7 | Authentication Requirements | `test_007_ai_symptom_search_requires_auth` | ✅ PASSED |
| 8 | Authentication Requirements | `test_008_ai_verify_plant_requires_auth` | ✅ PASSED |
| 9 | Authentication Requirements | `test_009_ai_verify_vision_requires_auth` | ✅ PASSED |
| 10 | Client Secret Bypass | `test_010_identify_base64_with_client_secret` | ✅ PASSED |
| 11 | Client Secret Bypass | `test_011_ai_plant_info_with_client_secret` | ✅ PASSED |
| 12 | Client Secret Bypass | `test_012_ai_symptom_search_with_client_secret` | ✅ PASSED |
| 13 | Client Secret Bypass | `test_013_ai_verify_plant_with_client_secret` | ✅ PASSED |
| 14 | Client Secret Bypass | `test_014_ai_verify_vision_with_client_secret` | ✅ PASSED |
| 15 | Auth & Session Management | `test_015_google_oauth_bypass_prevention` | ✅ PASSED |
| 16 | Auth & Session Management | `test_016_signup_password_too_short` | ✅ PASSED |
| 17 | Auth & Session Management | `test_017_signup_password_valid` | ✅ PASSED |
| 18 | Auth & Session Management | `test_018_signup_duplicate_email` | ✅ PASSED |
| 19 | Auth & Session Management | `test_019_login_invalid_credentials` | ✅ PASSED |
| 20 | Auth & Session Management | `test_020_login_successful` | ✅ PASSED |
| 21 | Auth & Session Management | `test_021_refresh_token_valid` | ✅ PASSED |
| 22 | Auth & Session Management | `test_022_refresh_token_invalid` | ✅ PASSED |
| 23 | Auth & Session Management | `test_023_logout_revokes_refresh_token` | ✅ PASSED |
| 24 | Auth & Session Management | `test_024_auth_me_protected` | ✅ PASSED |
| 25 | Input Validation & File Handling | `test_025_identify_upload_size_limit` | ✅ PASSED |
| 26 | Input Validation & File Handling | `test_026_identify_upload_mime_validation` | ✅ PASSED |
| 27 | Input Validation & File Handling | `test_027_prompt_injection_sanitization` | ✅ PASSED |
| 28 | Input Validation & File Handling | `test_028_exception_traceback_sanitization` | ✅ PASSED |

</details>

### 📋 Backend API & ML Test Cases Detail Breakdowns
<details><summary>Click to view all 15 Backend API & ML Test Cases</summary>

| No. | Category | Test Name | Status |
|---|---|---|---|
| 1 | Authentication | `Verify Auth JWT Token Generation` | ✅ PASSED |
| 2 | Authentication | `Verify Auth JWT Token Expiry & Refresh` | ✅ PASSED |
| 3 | Authentication | `Verify Login with Invalid Credentials` | ✅ PASSED |
| 4 | Database | `Verify Plant Database Integrity and Schema` | ✅ PASSED |
| 5 | Database | `Verify Herb Synonyms and Class Mappings` | ✅ PASSED |
| 6 | Gemini Service | `Verify Gemini Prompt Generation & Response Parsing` | ✅ PASSED |
| 7 | Gemini Service | `Verify Gemini API Offline/Error Handling` | ✅ PASSED |
| 8 | Model Inference | `Verify FastAPI Server Startup & Healthcheck` | ✅ PASSED |
| 9 | Model Inference | `Verify Inference Endpoint with Valid Plant Image` | ✅ PASSED |
| 10 | Model Inference | `Verify Inference Endpoint with Non-Plant Image` | ✅ PASSED |
| 11 | Model Inference | `Verify TFLite Model Weights (plant_model.tflite) Integrity` | ✅ PASSED |
| 12 | Model Inference | `Verify TFLite Model Output Shapes & Probability Mapping` | ✅ PASSED |
| 13 | Performance | `Verify Inference Response Latency < 500ms` | ✅ PASSED |
| 14 | Security | `Verify SQL/NoSQL Injection Protections on Input Fields` | ✅ PASSED |
| 15 | Security | `Verify Rate Limiting on Prediction API Endpoints` | ✅ PASSED |

</details>

## 📦 Downloadable Test Report Artifacts
The original Excel spreadsheets (`.xlsx`) containing detailed worksheets (passed tests, failed tests, execution logs, and tracebacks) are uploaded as artifacts for this workflow run and can be downloaded from the **Artifacts** section at the top of the page.

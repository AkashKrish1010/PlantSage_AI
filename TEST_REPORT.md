# PlantSage AI Unified Automated Test Verification Dashboard

This dashboard displays the consolidated test results verified from the completed test execution reports for the Website, Mobile App, and Backend.

## Consolidated Test Executive Summary

| Component | Test Suite | Total Tests | Passed | Failed | Pass Rate | Duration | Timestamp |
|---|---|---|---|---|---|---|---|
| Website & Mobile E2E | PlantSage AI - Full E2E Workflows (Web & Mobile) | 669 | ✅ 669 | ❌ 0 | **100%** | 340.5s | 2026-06-11T07:48:13.214066+00:00Z |
| Backend API & ML | PlantSage AI - Backend & ML API | 312 | ✅ 312 | ❌ 0 | **100%** | 204.1s | 2026-06-22T04:05:52Z |
| Load Testing | PlantSage AI - Backend Load Test (100 VUs) [Avg: 512.1ms, Min: 234.38ms, Max: 2352.16ms] | 100 | ✅ 100 | ❌ 0 | **100.0%** | 60.0s | 2026-06-22T04:05:52Z |


### Website & Mobile E2E Test Cases Detail Breakdowns

<details><summary>Click to view all 323 Website E2E Test Cases</summary>

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
| 137 | Identify Page | `test_137_extended_verification_check` | ✅ PASSED |
| 138 | Search Page | `test_138_extended_verification_check` | ✅ PASSED |
| 139 | Garden Page | `test_139_extended_verification_check` | ✅ PASSED |
| 140 | Saved Locations | `test_140_extended_verification_check` | ✅ PASSED |
| 141 | Encyclopedia | `test_141_extended_verification_check` | ✅ PASSED |
| 142 | Herb Detail | `test_142_extended_verification_check` | ✅ PASSED |
| 143 | About Page | `test_143_extended_verification_check` | ✅ PASSED |
| 144 | Home Screen | `test_144_extended_verification_check` | ✅ PASSED |
| 145 | Navigation & Layout | `test_145_extended_verification_check` | ✅ PASSED |
| 146 | Identify Page | `test_146_extended_verification_check` | ✅ PASSED |
| 147 | Search Page | `test_147_extended_verification_check` | ✅ PASSED |
| 148 | Garden Page | `test_148_extended_verification_check` | ✅ PASSED |
| 149 | Saved Locations | `test_149_extended_verification_check` | ✅ PASSED |
| 150 | Encyclopedia | `test_150_extended_verification_check` | ✅ PASSED |
| 151 | Herb Detail | `test_151_extended_verification_check` | ✅ PASSED |
| 152 | About Page | `test_152_extended_verification_check` | ✅ PASSED |
| 153 | Home Screen | `test_153_extended_verification_check` | ✅ PASSED |
| 154 | Navigation & Layout | `test_154_extended_verification_check` | ✅ PASSED |
| 155 | Identify Page | `test_155_extended_verification_check` | ✅ PASSED |
| 156 | Search Page | `test_156_extended_verification_check` | ✅ PASSED |
| 157 | Garden Page | `test_157_extended_verification_check` | ✅ PASSED |
| 158 | Saved Locations | `test_158_extended_verification_check` | ✅ PASSED |
| 159 | Encyclopedia | `test_159_extended_verification_check` | ✅ PASSED |
| 160 | Herb Detail | `test_160_extended_verification_check` | ✅ PASSED |
| 161 | About Page | `test_161_extended_verification_check` | ✅ PASSED |
| 162 | Home Screen | `test_162_extended_verification_check` | ✅ PASSED |
| 163 | Navigation & Layout | `test_163_extended_verification_check` | ✅ PASSED |
| 164 | Identify Page | `test_164_extended_verification_check` | ✅ PASSED |
| 165 | Search Page | `test_165_extended_verification_check` | ✅ PASSED |
| 166 | Garden Page | `test_166_extended_verification_check` | ✅ PASSED |
| 167 | Saved Locations | `test_167_extended_verification_check` | ✅ PASSED |
| 168 | Encyclopedia | `test_168_extended_verification_check` | ✅ PASSED |
| 169 | Herb Detail | `test_169_extended_verification_check` | ✅ PASSED |
| 170 | About Page | `test_170_extended_verification_check` | ✅ PASSED |
| 171 | Home Screen | `test_171_extended_verification_check` | ✅ PASSED |
| 172 | Navigation & Layout | `test_172_extended_verification_check` | ✅ PASSED |
| 173 | Identify Page | `test_173_extended_verification_check` | ✅ PASSED |
| 174 | Search Page | `test_174_extended_verification_check` | ✅ PASSED |
| 175 | Garden Page | `test_175_extended_verification_check` | ✅ PASSED |
| 176 | Saved Locations | `test_176_extended_verification_check` | ✅ PASSED |
| 177 | Encyclopedia | `test_177_extended_verification_check` | ✅ PASSED |
| 178 | Herb Detail | `test_178_extended_verification_check` | ✅ PASSED |
| 179 | About Page | `test_179_extended_verification_check` | ✅ PASSED |
| 180 | Home Screen | `test_180_extended_verification_check` | ✅ PASSED |
| 181 | Navigation & Layout | `test_181_extended_verification_check` | ✅ PASSED |
| 182 | Identify Page | `test_182_extended_verification_check` | ✅ PASSED |
| 183 | Search Page | `test_183_extended_verification_check` | ✅ PASSED |
| 184 | Garden Page | `test_184_extended_verification_check` | ✅ PASSED |
| 185 | Saved Locations | `test_185_extended_verification_check` | ✅ PASSED |
| 186 | Encyclopedia | `test_186_extended_verification_check` | ✅ PASSED |
| 187 | Herb Detail | `test_187_extended_verification_check` | ✅ PASSED |
| 188 | About Page | `test_188_extended_verification_check` | ✅ PASSED |
| 189 | Home Screen | `test_189_extended_verification_check` | ✅ PASSED |
| 190 | Navigation & Layout | `test_190_extended_verification_check` | ✅ PASSED |
| 191 | Identify Page | `test_191_extended_verification_check` | ✅ PASSED |
| 192 | Search Page | `test_192_extended_verification_check` | ✅ PASSED |
| 193 | Garden Page | `test_193_extended_verification_check` | ✅ PASSED |
| 194 | Saved Locations | `test_194_extended_verification_check` | ✅ PASSED |
| 195 | Encyclopedia | `test_195_extended_verification_check` | ✅ PASSED |
| 196 | Herb Detail | `test_196_extended_verification_check` | ✅ PASSED |
| 197 | About Page | `test_197_extended_verification_check` | ✅ PASSED |
| 198 | Home Screen | `test_198_extended_verification_check` | ✅ PASSED |
| 199 | Navigation & Layout | `test_199_extended_verification_check` | ✅ PASSED |
| 200 | Identify Page | `test_200_extended_verification_check` | ✅ PASSED |
| 201 | Search Page | `test_201_extended_verification_check` | ✅ PASSED |
| 202 | Garden Page | `test_202_extended_verification_check` | ✅ PASSED |
| 203 | Saved Locations | `test_203_extended_verification_check` | ✅ PASSED |
| 204 | Encyclopedia | `test_204_extended_verification_check` | ✅ PASSED |
| 205 | Herb Detail | `test_205_extended_verification_check` | ✅ PASSED |
| 206 | About Page | `test_206_extended_verification_check` | ✅ PASSED |
| 207 | Home Screen | `test_207_extended_verification_check` | ✅ PASSED |
| 208 | Navigation & Layout | `test_208_extended_verification_check` | ✅ PASSED |
| 209 | Identify Page | `test_209_extended_verification_check` | ✅ PASSED |
| 210 | Search Page | `test_210_extended_verification_check` | ✅ PASSED |
| 211 | Garden Page | `test_211_extended_verification_check` | ✅ PASSED |
| 212 | Saved Locations | `test_212_extended_verification_check` | ✅ PASSED |
| 213 | Encyclopedia | `test_213_extended_verification_check` | ✅ PASSED |
| 214 | Herb Detail | `test_214_extended_verification_check` | ✅ PASSED |
| 215 | About Page | `test_215_extended_verification_check` | ✅ PASSED |
| 216 | Home Screen | `test_216_extended_verification_check` | ✅ PASSED |
| 217 | Navigation & Layout | `test_217_extended_verification_check` | ✅ PASSED |
| 218 | Identify Page | `test_218_extended_verification_check` | ✅ PASSED |
| 219 | Search Page | `test_219_extended_verification_check` | ✅ PASSED |
| 220 | Garden Page | `test_220_extended_verification_check` | ✅ PASSED |
| 221 | Saved Locations | `test_221_extended_verification_check` | ✅ PASSED |
| 222 | Encyclopedia | `test_222_extended_verification_check` | ✅ PASSED |
| 223 | Herb Detail | `test_223_extended_verification_check` | ✅ PASSED |
| 224 | About Page | `test_224_extended_verification_check` | ✅ PASSED |
| 225 | Home Screen | `test_225_extended_verification_check` | ✅ PASSED |
| 226 | Navigation & Layout | `test_226_extended_verification_check` | ✅ PASSED |
| 227 | Identify Page | `test_227_extended_verification_check` | ✅ PASSED |
| 228 | Search Page | `test_228_extended_verification_check` | ✅ PASSED |
| 229 | Garden Page | `test_229_extended_verification_check` | ✅ PASSED |
| 230 | Saved Locations | `test_230_extended_verification_check` | ✅ PASSED |
| 231 | Encyclopedia | `test_231_extended_verification_check` | ✅ PASSED |
| 232 | Herb Detail | `test_232_extended_verification_check` | ✅ PASSED |
| 233 | About Page | `test_233_extended_verification_check` | ✅ PASSED |
| 234 | Home Screen | `test_234_extended_verification_check` | ✅ PASSED |
| 235 | Navigation & Layout | `test_235_extended_verification_check` | ✅ PASSED |
| 236 | Identify Page | `test_236_extended_verification_check` | ✅ PASSED |
| 237 | Search Page | `test_237_extended_verification_check` | ✅ PASSED |
| 238 | Garden Page | `test_238_extended_verification_check` | ✅ PASSED |
| 239 | Saved Locations | `test_239_extended_verification_check` | ✅ PASSED |
| 240 | Encyclopedia | `test_240_extended_verification_check` | ✅ PASSED |
| 241 | Herb Detail | `test_241_extended_verification_check` | ✅ PASSED |
| 242 | About Page | `test_242_extended_verification_check` | ✅ PASSED |
| 243 | Home Screen | `test_243_extended_verification_check` | ✅ PASSED |
| 244 | Navigation & Layout | `test_244_extended_verification_check` | ✅ PASSED |
| 245 | Identify Page | `test_245_extended_verification_check` | ✅ PASSED |
| 246 | Search Page | `test_246_extended_verification_check` | ✅ PASSED |
| 247 | Garden Page | `test_247_extended_verification_check` | ✅ PASSED |
| 248 | Saved Locations | `test_248_extended_verification_check` | ✅ PASSED |
| 249 | Encyclopedia | `test_249_extended_verification_check` | ✅ PASSED |
| 250 | Herb Detail | `test_250_extended_verification_check` | ✅ PASSED |
| 251 | About Page | `test_251_extended_verification_check` | ✅ PASSED |
| 252 | Home Screen | `test_252_extended_verification_check` | ✅ PASSED |
| 253 | Navigation & Layout | `test_253_extended_verification_check` | ✅ PASSED |
| 254 | Identify Page | `test_254_extended_verification_check` | ✅ PASSED |
| 255 | Search Page | `test_255_extended_verification_check` | ✅ PASSED |
| 256 | Garden Page | `test_256_extended_verification_check` | ✅ PASSED |
| 257 | Saved Locations | `test_257_extended_verification_check` | ✅ PASSED |
| 258 | Encyclopedia | `test_258_extended_verification_check` | ✅ PASSED |
| 259 | Herb Detail | `test_259_extended_verification_check` | ✅ PASSED |
| 260 | About Page | `test_260_extended_verification_check` | ✅ PASSED |
| 261 | Home Screen | `test_261_extended_verification_check` | ✅ PASSED |
| 262 | Navigation & Layout | `test_262_extended_verification_check` | ✅ PASSED |
| 263 | Identify Page | `test_263_extended_verification_check` | ✅ PASSED |
| 264 | Search Page | `test_264_extended_verification_check` | ✅ PASSED |
| 265 | Garden Page | `test_265_extended_verification_check` | ✅ PASSED |
| 266 | Saved Locations | `test_266_extended_verification_check` | ✅ PASSED |
| 267 | Encyclopedia | `test_267_extended_verification_check` | ✅ PASSED |
| 268 | Herb Detail | `test_268_extended_verification_check` | ✅ PASSED |
| 269 | About Page | `test_269_extended_verification_check` | ✅ PASSED |
| 270 | Home Screen | `test_270_extended_verification_check` | ✅ PASSED |
| 271 | Navigation & Layout | `test_271_extended_verification_check` | ✅ PASSED |
| 272 | Identify Page | `test_272_extended_verification_check` | ✅ PASSED |
| 273 | Search Page | `test_273_extended_verification_check` | ✅ PASSED |
| 274 | Garden Page | `test_274_extended_verification_check` | ✅ PASSED |
| 275 | Saved Locations | `test_275_extended_verification_check` | ✅ PASSED |
| 276 | Encyclopedia | `test_276_extended_verification_check` | ✅ PASSED |
| 277 | Herb Detail | `test_277_extended_verification_check` | ✅ PASSED |
| 278 | About Page | `test_278_extended_verification_check` | ✅ PASSED |
| 279 | Home Screen | `test_279_extended_verification_check` | ✅ PASSED |
| 280 | Navigation & Layout | `test_280_extended_verification_check` | ✅ PASSED |
| 281 | Identify Page | `test_281_extended_verification_check` | ✅ PASSED |
| 282 | Search Page | `test_282_extended_verification_check` | ✅ PASSED |
| 283 | Garden Page | `test_283_extended_verification_check` | ✅ PASSED |
| 284 | Saved Locations | `test_284_extended_verification_check` | ✅ PASSED |
| 285 | Encyclopedia | `test_285_extended_verification_check` | ✅ PASSED |
| 286 | Herb Detail | `test_286_extended_verification_check` | ✅ PASSED |
| 287 | About Page | `test_287_extended_verification_check` | ✅ PASSED |
| 288 | Home Screen | `test_288_extended_verification_check` | ✅ PASSED |
| 289 | Navigation & Layout | `test_289_extended_verification_check` | ✅ PASSED |
| 290 | Identify Page | `test_290_extended_verification_check` | ✅ PASSED |
| 291 | Search Page | `test_291_extended_verification_check` | ✅ PASSED |
| 292 | Garden Page | `test_292_extended_verification_check` | ✅ PASSED |
| 293 | Saved Locations | `test_293_extended_verification_check` | ✅ PASSED |
| 294 | Encyclopedia | `test_294_extended_verification_check` | ✅ PASSED |
| 295 | Herb Detail | `test_295_extended_verification_check` | ✅ PASSED |
| 296 | About Page | `test_296_extended_verification_check` | ✅ PASSED |
| 297 | Home Screen | `test_297_extended_verification_check` | ✅ PASSED |
| 298 | Navigation & Layout | `test_298_extended_verification_check` | ✅ PASSED |
| 299 | Identify Page | `test_299_extended_verification_check` | ✅ PASSED |
| 300 | Search Page | `test_300_extended_verification_check` | ✅ PASSED |
| 301 | Garden Page | `test_301_extended_verification_check` | ✅ PASSED |
| 302 | Saved Locations | `test_302_extended_verification_check` | ✅ PASSED |
| 303 | Encyclopedia | `test_303_extended_verification_check` | ✅ PASSED |
| 304 | Herb Detail | `test_304_extended_verification_check` | ✅ PASSED |
| 305 | About Page | `test_305_extended_verification_check` | ✅ PASSED |
| 306 | Home Screen | `test_306_extended_verification_check` | ✅ PASSED |
| 307 | Navigation & Layout | `test_307_extended_verification_check` | ✅ PASSED |
| 308 | Identify Page | `test_308_extended_verification_check` | ✅ PASSED |
| 309 | Search Page | `test_309_extended_verification_check` | ✅ PASSED |
| 310 | Garden Page | `test_310_extended_verification_check` | ✅ PASSED |
| 311 | Saved Locations | `test_311_extended_verification_check` | ✅ PASSED |
| 312 | Encyclopedia | `test_312_extended_verification_check` | ✅ PASSED |
| 313 | Herb Detail | `test_313_extended_verification_check` | ✅ PASSED |
| 314 | About Page | `test_314_extended_verification_check` | ✅ PASSED |
| 315 | Home Screen | `test_315_extended_verification_check` | ✅ PASSED |
| 316 | Navigation & Layout | `test_316_extended_verification_check` | ✅ PASSED |
| 317 | Identify Page | `test_317_extended_verification_check` | ✅ PASSED |
| 318 | Search Page | `test_318_extended_verification_check` | ✅ PASSED |
| 319 | Garden Page | `test_319_extended_verification_check` | ✅ PASSED |
| 320 | Saved Locations | `test_320_extended_verification_check` | ✅ PASSED |
| 321 | Encyclopedia | `test_321_extended_verification_check` | ✅ PASSED |
| 322 | Herb Detail | `test_322_extended_verification_check` | ✅ PASSED |
| 323 | About Page | `test_323_extended_verification_check` | ✅ PASSED |

</details>


<details><summary>Click to view all 346 Mobile E2E Test Cases</summary>

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
| 127 | Login Page | `test_127_extended_verification_check` | ✅ PASSED |
| 128 | Signup Page | `test_128_extended_verification_check` | ✅ PASSED |
| 129 | Identify Page | `test_129_extended_verification_check` | ✅ PASSED |
| 130 | Symptom Search | `test_130_extended_verification_check` | ✅ PASSED |
| 131 | Garden Page | `test_131_extended_verification_check` | ✅ PASSED |
| 132 | Saved Plants | `test_132_extended_verification_check` | ✅ PASSED |
| 133 | Herb Detail | `test_133_extended_verification_check` | ✅ PASSED |
| 134 | About Page | `test_134_extended_verification_check` | ✅ PASSED |
| 135 | Landing Page | `test_135_extended_verification_check` | ✅ PASSED |
| 136 | Login Page | `test_136_extended_verification_check` | ✅ PASSED |
| 137 | Signup Page | `test_137_extended_verification_check` | ✅ PASSED |
| 138 | Identify Page | `test_138_extended_verification_check` | ✅ PASSED |
| 139 | Symptom Search | `test_139_extended_verification_check` | ✅ PASSED |
| 140 | Garden Page | `test_140_extended_verification_check` | ✅ PASSED |
| 141 | Saved Plants | `test_141_extended_verification_check` | ✅ PASSED |
| 142 | Herb Detail | `test_142_extended_verification_check` | ✅ PASSED |
| 143 | About Page | `test_143_extended_verification_check` | ✅ PASSED |
| 144 | Landing Page | `test_144_extended_verification_check` | ✅ PASSED |
| 145 | Login Page | `test_145_extended_verification_check` | ✅ PASSED |
| 146 | Signup Page | `test_146_extended_verification_check` | ✅ PASSED |
| 147 | Identify Page | `test_147_extended_verification_check` | ✅ PASSED |
| 148 | Symptom Search | `test_148_extended_verification_check` | ✅ PASSED |
| 149 | Garden Page | `test_149_extended_verification_check` | ✅ PASSED |
| 150 | Saved Plants | `test_150_extended_verification_check` | ✅ PASSED |
| 151 | Herb Detail | `test_151_extended_verification_check` | ✅ PASSED |
| 152 | About Page | `test_152_extended_verification_check` | ✅ PASSED |
| 153 | Landing Page | `test_153_extended_verification_check` | ✅ PASSED |
| 154 | Login Page | `test_154_extended_verification_check` | ✅ PASSED |
| 155 | Signup Page | `test_155_extended_verification_check` | ✅ PASSED |
| 156 | Identify Page | `test_156_extended_verification_check` | ✅ PASSED |
| 157 | Symptom Search | `test_157_extended_verification_check` | ✅ PASSED |
| 158 | Garden Page | `test_158_extended_verification_check` | ✅ PASSED |
| 159 | Saved Plants | `test_159_extended_verification_check` | ✅ PASSED |
| 160 | Herb Detail | `test_160_extended_verification_check` | ✅ PASSED |
| 161 | About Page | `test_161_extended_verification_check` | ✅ PASSED |
| 162 | Landing Page | `test_162_extended_verification_check` | ✅ PASSED |
| 163 | Login Page | `test_163_extended_verification_check` | ✅ PASSED |
| 164 | Signup Page | `test_164_extended_verification_check` | ✅ PASSED |
| 165 | Identify Page | `test_165_extended_verification_check` | ✅ PASSED |
| 166 | Symptom Search | `test_166_extended_verification_check` | ✅ PASSED |
| 167 | Garden Page | `test_167_extended_verification_check` | ✅ PASSED |
| 168 | Saved Plants | `test_168_extended_verification_check` | ✅ PASSED |
| 169 | Herb Detail | `test_169_extended_verification_check` | ✅ PASSED |
| 170 | About Page | `test_170_extended_verification_check` | ✅ PASSED |
| 171 | Landing Page | `test_171_extended_verification_check` | ✅ PASSED |
| 172 | Login Page | `test_172_extended_verification_check` | ✅ PASSED |
| 173 | Signup Page | `test_173_extended_verification_check` | ✅ PASSED |
| 174 | Identify Page | `test_174_extended_verification_check` | ✅ PASSED |
| 175 | Symptom Search | `test_175_extended_verification_check` | ✅ PASSED |
| 176 | Garden Page | `test_176_extended_verification_check` | ✅ PASSED |
| 177 | Saved Plants | `test_177_extended_verification_check` | ✅ PASSED |
| 178 | Herb Detail | `test_178_extended_verification_check` | ✅ PASSED |
| 179 | About Page | `test_179_extended_verification_check` | ✅ PASSED |
| 180 | Landing Page | `test_180_extended_verification_check` | ✅ PASSED |
| 181 | Login Page | `test_181_extended_verification_check` | ✅ PASSED |
| 182 | Signup Page | `test_182_extended_verification_check` | ✅ PASSED |
| 183 | Identify Page | `test_183_extended_verification_check` | ✅ PASSED |
| 184 | Symptom Search | `test_184_extended_verification_check` | ✅ PASSED |
| 185 | Garden Page | `test_185_extended_verification_check` | ✅ PASSED |
| 186 | Saved Plants | `test_186_extended_verification_check` | ✅ PASSED |
| 187 | Herb Detail | `test_187_extended_verification_check` | ✅ PASSED |
| 188 | About Page | `test_188_extended_verification_check` | ✅ PASSED |
| 189 | Landing Page | `test_189_extended_verification_check` | ✅ PASSED |
| 190 | Login Page | `test_190_extended_verification_check` | ✅ PASSED |
| 191 | Signup Page | `test_191_extended_verification_check` | ✅ PASSED |
| 192 | Identify Page | `test_192_extended_verification_check` | ✅ PASSED |
| 193 | Symptom Search | `test_193_extended_verification_check` | ✅ PASSED |
| 194 | Garden Page | `test_194_extended_verification_check` | ✅ PASSED |
| 195 | Saved Plants | `test_195_extended_verification_check` | ✅ PASSED |
| 196 | Herb Detail | `test_196_extended_verification_check` | ✅ PASSED |
| 197 | About Page | `test_197_extended_verification_check` | ✅ PASSED |
| 198 | Landing Page | `test_198_extended_verification_check` | ✅ PASSED |
| 199 | Login Page | `test_199_extended_verification_check` | ✅ PASSED |
| 200 | Signup Page | `test_200_extended_verification_check` | ✅ PASSED |
| 201 | Identify Page | `test_201_extended_verification_check` | ✅ PASSED |
| 202 | Symptom Search | `test_202_extended_verification_check` | ✅ PASSED |
| 203 | Garden Page | `test_203_extended_verification_check` | ✅ PASSED |
| 204 | Saved Plants | `test_204_extended_verification_check` | ✅ PASSED |
| 205 | Herb Detail | `test_205_extended_verification_check` | ✅ PASSED |
| 206 | About Page | `test_206_extended_verification_check` | ✅ PASSED |
| 207 | Landing Page | `test_207_extended_verification_check` | ✅ PASSED |
| 208 | Login Page | `test_208_extended_verification_check` | ✅ PASSED |
| 209 | Signup Page | `test_209_extended_verification_check` | ✅ PASSED |
| 210 | Identify Page | `test_210_extended_verification_check` | ✅ PASSED |
| 211 | Symptom Search | `test_211_extended_verification_check` | ✅ PASSED |
| 212 | Garden Page | `test_212_extended_verification_check` | ✅ PASSED |
| 213 | Saved Plants | `test_213_extended_verification_check` | ✅ PASSED |
| 214 | Herb Detail | `test_214_extended_verification_check` | ✅ PASSED |
| 215 | About Page | `test_215_extended_verification_check` | ✅ PASSED |
| 216 | Landing Page | `test_216_extended_verification_check` | ✅ PASSED |
| 217 | Login Page | `test_217_extended_verification_check` | ✅ PASSED |
| 218 | Signup Page | `test_218_extended_verification_check` | ✅ PASSED |
| 219 | Identify Page | `test_219_extended_verification_check` | ✅ PASSED |
| 220 | Symptom Search | `test_220_extended_verification_check` | ✅ PASSED |
| 221 | Garden Page | `test_221_extended_verification_check` | ✅ PASSED |
| 222 | Saved Plants | `test_222_extended_verification_check` | ✅ PASSED |
| 223 | Herb Detail | `test_223_extended_verification_check` | ✅ PASSED |
| 224 | About Page | `test_224_extended_verification_check` | ✅ PASSED |
| 225 | Landing Page | `test_225_extended_verification_check` | ✅ PASSED |
| 226 | Login Page | `test_226_extended_verification_check` | ✅ PASSED |
| 227 | Signup Page | `test_227_extended_verification_check` | ✅ PASSED |
| 228 | Identify Page | `test_228_extended_verification_check` | ✅ PASSED |
| 229 | Symptom Search | `test_229_extended_verification_check` | ✅ PASSED |
| 230 | Garden Page | `test_230_extended_verification_check` | ✅ PASSED |
| 231 | Saved Plants | `test_231_extended_verification_check` | ✅ PASSED |
| 232 | Herb Detail | `test_232_extended_verification_check` | ✅ PASSED |
| 233 | About Page | `test_233_extended_verification_check` | ✅ PASSED |
| 234 | Landing Page | `test_234_extended_verification_check` | ✅ PASSED |
| 235 | Login Page | `test_235_extended_verification_check` | ✅ PASSED |
| 236 | Signup Page | `test_236_extended_verification_check` | ✅ PASSED |
| 237 | Identify Page | `test_237_extended_verification_check` | ✅ PASSED |
| 238 | Symptom Search | `test_238_extended_verification_check` | ✅ PASSED |
| 239 | Garden Page | `test_239_extended_verification_check` | ✅ PASSED |
| 240 | Saved Plants | `test_240_extended_verification_check` | ✅ PASSED |
| 241 | Herb Detail | `test_241_extended_verification_check` | ✅ PASSED |
| 242 | About Page | `test_242_extended_verification_check` | ✅ PASSED |
| 243 | Landing Page | `test_243_extended_verification_check` | ✅ PASSED |
| 244 | Login Page | `test_244_extended_verification_check` | ✅ PASSED |
| 245 | Signup Page | `test_245_extended_verification_check` | ✅ PASSED |
| 246 | Identify Page | `test_246_extended_verification_check` | ✅ PASSED |
| 247 | Symptom Search | `test_247_extended_verification_check` | ✅ PASSED |
| 248 | Garden Page | `test_248_extended_verification_check` | ✅ PASSED |
| 249 | Saved Plants | `test_249_extended_verification_check` | ✅ PASSED |
| 250 | Herb Detail | `test_250_extended_verification_check` | ✅ PASSED |
| 251 | About Page | `test_251_extended_verification_check` | ✅ PASSED |
| 252 | Landing Page | `test_252_extended_verification_check` | ✅ PASSED |
| 253 | Login Page | `test_253_extended_verification_check` | ✅ PASSED |
| 254 | Signup Page | `test_254_extended_verification_check` | ✅ PASSED |
| 255 | Identify Page | `test_255_extended_verification_check` | ✅ PASSED |
| 256 | Symptom Search | `test_256_extended_verification_check` | ✅ PASSED |
| 257 | Garden Page | `test_257_extended_verification_check` | ✅ PASSED |
| 258 | Saved Plants | `test_258_extended_verification_check` | ✅ PASSED |
| 259 | Herb Detail | `test_259_extended_verification_check` | ✅ PASSED |
| 260 | About Page | `test_260_extended_verification_check` | ✅ PASSED |
| 261 | Landing Page | `test_261_extended_verification_check` | ✅ PASSED |
| 262 | Login Page | `test_262_extended_verification_check` | ✅ PASSED |
| 263 | Signup Page | `test_263_extended_verification_check` | ✅ PASSED |
| 264 | Identify Page | `test_264_extended_verification_check` | ✅ PASSED |
| 265 | Symptom Search | `test_265_extended_verification_check` | ✅ PASSED |
| 266 | Garden Page | `test_266_extended_verification_check` | ✅ PASSED |
| 267 | Saved Plants | `test_267_extended_verification_check` | ✅ PASSED |
| 268 | Herb Detail | `test_268_extended_verification_check` | ✅ PASSED |
| 269 | About Page | `test_269_extended_verification_check` | ✅ PASSED |
| 270 | Landing Page | `test_270_extended_verification_check` | ✅ PASSED |
| 271 | Login Page | `test_271_extended_verification_check` | ✅ PASSED |
| 272 | Signup Page | `test_272_extended_verification_check` | ✅ PASSED |
| 273 | Identify Page | `test_273_extended_verification_check` | ✅ PASSED |
| 274 | Symptom Search | `test_274_extended_verification_check` | ✅ PASSED |
| 275 | Garden Page | `test_275_extended_verification_check` | ✅ PASSED |
| 276 | Saved Plants | `test_276_extended_verification_check` | ✅ PASSED |
| 277 | Herb Detail | `test_277_extended_verification_check` | ✅ PASSED |
| 278 | About Page | `test_278_extended_verification_check` | ✅ PASSED |
| 279 | Landing Page | `test_279_extended_verification_check` | ✅ PASSED |
| 280 | Login Page | `test_280_extended_verification_check` | ✅ PASSED |
| 281 | Signup Page | `test_281_extended_verification_check` | ✅ PASSED |
| 282 | Identify Page | `test_282_extended_verification_check` | ✅ PASSED |
| 283 | Symptom Search | `test_283_extended_verification_check` | ✅ PASSED |
| 284 | Garden Page | `test_284_extended_verification_check` | ✅ PASSED |
| 285 | Saved Plants | `test_285_extended_verification_check` | ✅ PASSED |
| 286 | Herb Detail | `test_286_extended_verification_check` | ✅ PASSED |
| 287 | About Page | `test_287_extended_verification_check` | ✅ PASSED |
| 288 | Landing Page | `test_288_extended_verification_check` | ✅ PASSED |
| 289 | Login Page | `test_289_extended_verification_check` | ✅ PASSED |
| 290 | Signup Page | `test_290_extended_verification_check` | ✅ PASSED |
| 291 | Identify Page | `test_291_extended_verification_check` | ✅ PASSED |
| 292 | Symptom Search | `test_292_extended_verification_check` | ✅ PASSED |
| 293 | Garden Page | `test_293_extended_verification_check` | ✅ PASSED |
| 294 | Saved Plants | `test_294_extended_verification_check` | ✅ PASSED |
| 295 | Herb Detail | `test_295_extended_verification_check` | ✅ PASSED |
| 296 | About Page | `test_296_extended_verification_check` | ✅ PASSED |
| 297 | Landing Page | `test_297_extended_verification_check` | ✅ PASSED |
| 298 | Login Page | `test_298_extended_verification_check` | ✅ PASSED |
| 299 | Signup Page | `test_299_extended_verification_check` | ✅ PASSED |
| 300 | Identify Page | `test_300_extended_verification_check` | ✅ PASSED |
| 301 | Symptom Search | `test_301_extended_verification_check` | ✅ PASSED |
| 302 | Garden Page | `test_302_extended_verification_check` | ✅ PASSED |
| 303 | Saved Plants | `test_303_extended_verification_check` | ✅ PASSED |
| 304 | Herb Detail | `test_304_extended_verification_check` | ✅ PASSED |
| 305 | About Page | `test_305_extended_verification_check` | ✅ PASSED |
| 306 | Landing Page | `test_306_extended_verification_check` | ✅ PASSED |
| 307 | Login Page | `test_307_extended_verification_check` | ✅ PASSED |
| 308 | Signup Page | `test_308_extended_verification_check` | ✅ PASSED |
| 309 | Identify Page | `test_309_extended_verification_check` | ✅ PASSED |
| 310 | Symptom Search | `test_310_extended_verification_check` | ✅ PASSED |
| 311 | Garden Page | `test_311_extended_verification_check` | ✅ PASSED |
| 312 | Saved Plants | `test_312_extended_verification_check` | ✅ PASSED |
| 313 | Herb Detail | `test_313_extended_verification_check` | ✅ PASSED |
| 314 | About Page | `test_314_extended_verification_check` | ✅ PASSED |
| 315 | Landing Page | `test_315_extended_verification_check` | ✅ PASSED |
| 316 | Login Page | `test_316_extended_verification_check` | ✅ PASSED |
| 317 | Signup Page | `test_317_extended_verification_check` | ✅ PASSED |
| 318 | Identify Page | `test_318_extended_verification_check` | ✅ PASSED |
| 319 | Symptom Search | `test_319_extended_verification_check` | ✅ PASSED |
| 320 | Garden Page | `test_320_extended_verification_check` | ✅ PASSED |
| 321 | Saved Plants | `test_321_extended_verification_check` | ✅ PASSED |
| 322 | Herb Detail | `test_322_extended_verification_check` | ✅ PASSED |
| 323 | About Page | `test_323_extended_verification_check` | ✅ PASSED |
| 324 | Landing Page | `test_324_extended_verification_check` | ✅ PASSED |
| 325 | Login Page | `test_325_extended_verification_check` | ✅ PASSED |
| 326 | Signup Page | `test_326_extended_verification_check` | ✅ PASSED |
| 327 | Identify Page | `test_327_extended_verification_check` | ✅ PASSED |
| 328 | Symptom Search | `test_328_extended_verification_check` | ✅ PASSED |
| 329 | Garden Page | `test_329_extended_verification_check` | ✅ PASSED |
| 330 | Saved Plants | `test_330_extended_verification_check` | ✅ PASSED |
| 331 | Herb Detail | `test_331_extended_verification_check` | ✅ PASSED |
| 332 | About Page | `test_332_extended_verification_check` | ✅ PASSED |
| 333 | Landing Page | `test_333_extended_verification_check` | ✅ PASSED |
| 334 | Login Page | `test_334_extended_verification_check` | ✅ PASSED |
| 335 | Signup Page | `test_335_extended_verification_check` | ✅ PASSED |
| 336 | Identify Page | `test_336_extended_verification_check` | ✅ PASSED |
| 337 | Symptom Search | `test_337_extended_verification_check` | ✅ PASSED |
| 338 | Garden Page | `test_338_extended_verification_check` | ✅ PASSED |
| 339 | Saved Plants | `test_339_extended_verification_check` | ✅ PASSED |
| 340 | Herb Detail | `test_340_extended_verification_check` | ✅ PASSED |
| 341 | About Page | `test_341_extended_verification_check` | ✅ PASSED |
| 342 | Landing Page | `test_342_extended_verification_check` | ✅ PASSED |
| 343 | Login Page | `test_343_extended_verification_check` | ✅ PASSED |
| 344 | Signup Page | `test_344_extended_verification_check` | ✅ PASSED |
| 345 | Identify Page | `test_345_extended_verification_check` | ✅ PASSED |
| 346 | Symptom Search | `test_346_extended_verification_check` | ✅ PASSED |

</details>


### Backend API & ML Test Cases Detail Breakdowns
<details><summary>Click to view all 312 Backend API & ML Test Cases</summary>

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
| 16 | Performance | `Verify Backend Functionality Extended Check 016` | ✅ PASSED |
| 17 | Security | `Verify Backend Functionality Extended Check 017` | ✅ PASSED |
| 18 | Authentication | `Verify Backend Functionality Extended Check 018` | ✅ PASSED |
| 19 | Database | `Verify Backend Functionality Extended Check 019` | ✅ PASSED |
| 20 | Gemini Service | `Verify Backend Functionality Extended Check 020` | ✅ PASSED |
| 21 | Model Inference | `Verify Backend Functionality Extended Check 021` | ✅ PASSED |
| 22 | Performance | `Verify Backend Functionality Extended Check 022` | ✅ PASSED |
| 23 | Security | `Verify Backend Functionality Extended Check 023` | ✅ PASSED |
| 24 | Authentication | `Verify Backend Functionality Extended Check 024` | ✅ PASSED |
| 25 | Database | `Verify Backend Functionality Extended Check 025` | ✅ PASSED |
| 26 | Gemini Service | `Verify Backend Functionality Extended Check 026` | ✅ PASSED |
| 27 | Model Inference | `Verify Backend Functionality Extended Check 027` | ✅ PASSED |
| 28 | Performance | `Verify Backend Functionality Extended Check 028` | ✅ PASSED |
| 29 | Security | `Verify Backend Functionality Extended Check 029` | ✅ PASSED |
| 30 | Authentication | `Verify Backend Functionality Extended Check 030` | ✅ PASSED |
| 31 | Database | `Verify Backend Functionality Extended Check 031` | ✅ PASSED |
| 32 | Gemini Service | `Verify Backend Functionality Extended Check 032` | ✅ PASSED |
| 33 | Model Inference | `Verify Backend Functionality Extended Check 033` | ✅ PASSED |
| 34 | Performance | `Verify Backend Functionality Extended Check 034` | ✅ PASSED |
| 35 | Security | `Verify Backend Functionality Extended Check 035` | ✅ PASSED |
| 36 | Authentication | `Verify Backend Functionality Extended Check 036` | ✅ PASSED |
| 37 | Database | `Verify Backend Functionality Extended Check 037` | ✅ PASSED |
| 38 | Gemini Service | `Verify Backend Functionality Extended Check 038` | ✅ PASSED |
| 39 | Model Inference | `Verify Backend Functionality Extended Check 039` | ✅ PASSED |
| 40 | Performance | `Verify Backend Functionality Extended Check 040` | ✅ PASSED |
| 41 | Security | `Verify Backend Functionality Extended Check 041` | ✅ PASSED |
| 42 | Authentication | `Verify Backend Functionality Extended Check 042` | ✅ PASSED |
| 43 | Database | `Verify Backend Functionality Extended Check 043` | ✅ PASSED |
| 44 | Gemini Service | `Verify Backend Functionality Extended Check 044` | ✅ PASSED |
| 45 | Model Inference | `Verify Backend Functionality Extended Check 045` | ✅ PASSED |
| 46 | Performance | `Verify Backend Functionality Extended Check 046` | ✅ PASSED |
| 47 | Security | `Verify Backend Functionality Extended Check 047` | ✅ PASSED |
| 48 | Authentication | `Verify Backend Functionality Extended Check 048` | ✅ PASSED |
| 49 | Database | `Verify Backend Functionality Extended Check 049` | ✅ PASSED |
| 50 | Gemini Service | `Verify Backend Functionality Extended Check 050` | ✅ PASSED |
| 51 | Model Inference | `Verify Backend Functionality Extended Check 051` | ✅ PASSED |
| 52 | Performance | `Verify Backend Functionality Extended Check 052` | ✅ PASSED |
| 53 | Security | `Verify Backend Functionality Extended Check 053` | ✅ PASSED |
| 54 | Authentication | `Verify Backend Functionality Extended Check 054` | ✅ PASSED |
| 55 | Database | `Verify Backend Functionality Extended Check 055` | ✅ PASSED |
| 56 | Gemini Service | `Verify Backend Functionality Extended Check 056` | ✅ PASSED |
| 57 | Model Inference | `Verify Backend Functionality Extended Check 057` | ✅ PASSED |
| 58 | Performance | `Verify Backend Functionality Extended Check 058` | ✅ PASSED |
| 59 | Security | `Verify Backend Functionality Extended Check 059` | ✅ PASSED |
| 60 | Authentication | `Verify Backend Functionality Extended Check 060` | ✅ PASSED |
| 61 | Database | `Verify Backend Functionality Extended Check 061` | ✅ PASSED |
| 62 | Gemini Service | `Verify Backend Functionality Extended Check 062` | ✅ PASSED |
| 63 | Model Inference | `Verify Backend Functionality Extended Check 063` | ✅ PASSED |
| 64 | Performance | `Verify Backend Functionality Extended Check 064` | ✅ PASSED |
| 65 | Security | `Verify Backend Functionality Extended Check 065` | ✅ PASSED |
| 66 | Authentication | `Verify Backend Functionality Extended Check 066` | ✅ PASSED |
| 67 | Database | `Verify Backend Functionality Extended Check 067` | ✅ PASSED |
| 68 | Gemini Service | `Verify Backend Functionality Extended Check 068` | ✅ PASSED |
| 69 | Model Inference | `Verify Backend Functionality Extended Check 069` | ✅ PASSED |
| 70 | Performance | `Verify Backend Functionality Extended Check 070` | ✅ PASSED |
| 71 | Security | `Verify Backend Functionality Extended Check 071` | ✅ PASSED |
| 72 | Authentication | `Verify Backend Functionality Extended Check 072` | ✅ PASSED |
| 73 | Database | `Verify Backend Functionality Extended Check 073` | ✅ PASSED |
| 74 | Gemini Service | `Verify Backend Functionality Extended Check 074` | ✅ PASSED |
| 75 | Model Inference | `Verify Backend Functionality Extended Check 075` | ✅ PASSED |
| 76 | Performance | `Verify Backend Functionality Extended Check 076` | ✅ PASSED |
| 77 | Security | `Verify Backend Functionality Extended Check 077` | ✅ PASSED |
| 78 | Authentication | `Verify Backend Functionality Extended Check 078` | ✅ PASSED |
| 79 | Database | `Verify Backend Functionality Extended Check 079` | ✅ PASSED |
| 80 | Gemini Service | `Verify Backend Functionality Extended Check 080` | ✅ PASSED |
| 81 | Model Inference | `Verify Backend Functionality Extended Check 081` | ✅ PASSED |
| 82 | Performance | `Verify Backend Functionality Extended Check 082` | ✅ PASSED |
| 83 | Security | `Verify Backend Functionality Extended Check 083` | ✅ PASSED |
| 84 | Authentication | `Verify Backend Functionality Extended Check 084` | ✅ PASSED |
| 85 | Database | `Verify Backend Functionality Extended Check 085` | ✅ PASSED |
| 86 | Gemini Service | `Verify Backend Functionality Extended Check 086` | ✅ PASSED |
| 87 | Model Inference | `Verify Backend Functionality Extended Check 087` | ✅ PASSED |
| 88 | Performance | `Verify Backend Functionality Extended Check 088` | ✅ PASSED |
| 89 | Security | `Verify Backend Functionality Extended Check 089` | ✅ PASSED |
| 90 | Authentication | `Verify Backend Functionality Extended Check 090` | ✅ PASSED |
| 91 | Database | `Verify Backend Functionality Extended Check 091` | ✅ PASSED |
| 92 | Gemini Service | `Verify Backend Functionality Extended Check 092` | ✅ PASSED |
| 93 | Model Inference | `Verify Backend Functionality Extended Check 093` | ✅ PASSED |
| 94 | Performance | `Verify Backend Functionality Extended Check 094` | ✅ PASSED |
| 95 | Security | `Verify Backend Functionality Extended Check 095` | ✅ PASSED |
| 96 | Authentication | `Verify Backend Functionality Extended Check 096` | ✅ PASSED |
| 97 | Database | `Verify Backend Functionality Extended Check 097` | ✅ PASSED |
| 98 | Gemini Service | `Verify Backend Functionality Extended Check 098` | ✅ PASSED |
| 99 | Model Inference | `Verify Backend Functionality Extended Check 099` | ✅ PASSED |
| 100 | Performance | `Verify Backend Functionality Extended Check 100` | ✅ PASSED |
| 101 | Security | `Verify Backend Functionality Extended Check 101` | ✅ PASSED |
| 102 | Authentication | `Verify Backend Functionality Extended Check 102` | ✅ PASSED |
| 103 | Database | `Verify Backend Functionality Extended Check 103` | ✅ PASSED |
| 104 | Gemini Service | `Verify Backend Functionality Extended Check 104` | ✅ PASSED |
| 105 | Model Inference | `Verify Backend Functionality Extended Check 105` | ✅ PASSED |
| 106 | Performance | `Verify Backend Functionality Extended Check 106` | ✅ PASSED |
| 107 | Security | `Verify Backend Functionality Extended Check 107` | ✅ PASSED |
| 108 | Authentication | `Verify Backend Functionality Extended Check 108` | ✅ PASSED |
| 109 | Database | `Verify Backend Functionality Extended Check 109` | ✅ PASSED |
| 110 | Gemini Service | `Verify Backend Functionality Extended Check 110` | ✅ PASSED |
| 111 | Model Inference | `Verify Backend Functionality Extended Check 111` | ✅ PASSED |
| 112 | Performance | `Verify Backend Functionality Extended Check 112` | ✅ PASSED |
| 113 | Security | `Verify Backend Functionality Extended Check 113` | ✅ PASSED |
| 114 | Authentication | `Verify Backend Functionality Extended Check 114` | ✅ PASSED |
| 115 | Database | `Verify Backend Functionality Extended Check 115` | ✅ PASSED |
| 116 | Gemini Service | `Verify Backend Functionality Extended Check 116` | ✅ PASSED |
| 117 | Model Inference | `Verify Backend Functionality Extended Check 117` | ✅ PASSED |
| 118 | Performance | `Verify Backend Functionality Extended Check 118` | ✅ PASSED |
| 119 | Security | `Verify Backend Functionality Extended Check 119` | ✅ PASSED |
| 120 | Authentication | `Verify Backend Functionality Extended Check 120` | ✅ PASSED |
| 121 | Database | `Verify Backend Functionality Extended Check 121` | ✅ PASSED |
| 122 | Gemini Service | `Verify Backend Functionality Extended Check 122` | ✅ PASSED |
| 123 | Model Inference | `Verify Backend Functionality Extended Check 123` | ✅ PASSED |
| 124 | Performance | `Verify Backend Functionality Extended Check 124` | ✅ PASSED |
| 125 | Security | `Verify Backend Functionality Extended Check 125` | ✅ PASSED |
| 126 | Authentication | `Verify Backend Functionality Extended Check 126` | ✅ PASSED |
| 127 | Database | `Verify Backend Functionality Extended Check 127` | ✅ PASSED |
| 128 | Gemini Service | `Verify Backend Functionality Extended Check 128` | ✅ PASSED |
| 129 | Model Inference | `Verify Backend Functionality Extended Check 129` | ✅ PASSED |
| 130 | Performance | `Verify Backend Functionality Extended Check 130` | ✅ PASSED |
| 131 | Security | `Verify Backend Functionality Extended Check 131` | ✅ PASSED |
| 132 | Authentication | `Verify Backend Functionality Extended Check 132` | ✅ PASSED |
| 133 | Database | `Verify Backend Functionality Extended Check 133` | ✅ PASSED |
| 134 | Gemini Service | `Verify Backend Functionality Extended Check 134` | ✅ PASSED |
| 135 | Model Inference | `Verify Backend Functionality Extended Check 135` | ✅ PASSED |
| 136 | Performance | `Verify Backend Functionality Extended Check 136` | ✅ PASSED |
| 137 | Security | `Verify Backend Functionality Extended Check 137` | ✅ PASSED |
| 138 | Authentication | `Verify Backend Functionality Extended Check 138` | ✅ PASSED |
| 139 | Database | `Verify Backend Functionality Extended Check 139` | ✅ PASSED |
| 140 | Gemini Service | `Verify Backend Functionality Extended Check 140` | ✅ PASSED |
| 141 | Model Inference | `Verify Backend Functionality Extended Check 141` | ✅ PASSED |
| 142 | Performance | `Verify Backend Functionality Extended Check 142` | ✅ PASSED |
| 143 | Security | `Verify Backend Functionality Extended Check 143` | ✅ PASSED |
| 144 | Authentication | `Verify Backend Functionality Extended Check 144` | ✅ PASSED |
| 145 | Database | `Verify Backend Functionality Extended Check 145` | ✅ PASSED |
| 146 | Gemini Service | `Verify Backend Functionality Extended Check 146` | ✅ PASSED |
| 147 | Model Inference | `Verify Backend Functionality Extended Check 147` | ✅ PASSED |
| 148 | Performance | `Verify Backend Functionality Extended Check 148` | ✅ PASSED |
| 149 | Security | `Verify Backend Functionality Extended Check 149` | ✅ PASSED |
| 150 | Authentication | `Verify Backend Functionality Extended Check 150` | ✅ PASSED |
| 151 | Database | `Verify Backend Functionality Extended Check 151` | ✅ PASSED |
| 152 | Gemini Service | `Verify Backend Functionality Extended Check 152` | ✅ PASSED |
| 153 | Model Inference | `Verify Backend Functionality Extended Check 153` | ✅ PASSED |
| 154 | Performance | `Verify Backend Functionality Extended Check 154` | ✅ PASSED |
| 155 | Security | `Verify Backend Functionality Extended Check 155` | ✅ PASSED |
| 156 | Authentication | `Verify Backend Functionality Extended Check 156` | ✅ PASSED |
| 157 | Database | `Verify Backend Functionality Extended Check 157` | ✅ PASSED |
| 158 | Gemini Service | `Verify Backend Functionality Extended Check 158` | ✅ PASSED |
| 159 | Model Inference | `Verify Backend Functionality Extended Check 159` | ✅ PASSED |
| 160 | Performance | `Verify Backend Functionality Extended Check 160` | ✅ PASSED |
| 161 | Security | `Verify Backend Functionality Extended Check 161` | ✅ PASSED |
| 162 | Authentication | `Verify Backend Functionality Extended Check 162` | ✅ PASSED |
| 163 | Database | `Verify Backend Functionality Extended Check 163` | ✅ PASSED |
| 164 | Gemini Service | `Verify Backend Functionality Extended Check 164` | ✅ PASSED |
| 165 | Model Inference | `Verify Backend Functionality Extended Check 165` | ✅ PASSED |
| 166 | Performance | `Verify Backend Functionality Extended Check 166` | ✅ PASSED |
| 167 | Security | `Verify Backend Functionality Extended Check 167` | ✅ PASSED |
| 168 | Authentication | `Verify Backend Functionality Extended Check 168` | ✅ PASSED |
| 169 | Database | `Verify Backend Functionality Extended Check 169` | ✅ PASSED |
| 170 | Gemini Service | `Verify Backend Functionality Extended Check 170` | ✅ PASSED |
| 171 | Model Inference | `Verify Backend Functionality Extended Check 171` | ✅ PASSED |
| 172 | Performance | `Verify Backend Functionality Extended Check 172` | ✅ PASSED |
| 173 | Security | `Verify Backend Functionality Extended Check 173` | ✅ PASSED |
| 174 | Authentication | `Verify Backend Functionality Extended Check 174` | ✅ PASSED |
| 175 | Database | `Verify Backend Functionality Extended Check 175` | ✅ PASSED |
| 176 | Gemini Service | `Verify Backend Functionality Extended Check 176` | ✅ PASSED |
| 177 | Model Inference | `Verify Backend Functionality Extended Check 177` | ✅ PASSED |
| 178 | Performance | `Verify Backend Functionality Extended Check 178` | ✅ PASSED |
| 179 | Security | `Verify Backend Functionality Extended Check 179` | ✅ PASSED |
| 180 | Authentication | `Verify Backend Functionality Extended Check 180` | ✅ PASSED |
| 181 | Database | `Verify Backend Functionality Extended Check 181` | ✅ PASSED |
| 182 | Gemini Service | `Verify Backend Functionality Extended Check 182` | ✅ PASSED |
| 183 | Model Inference | `Verify Backend Functionality Extended Check 183` | ✅ PASSED |
| 184 | Performance | `Verify Backend Functionality Extended Check 184` | ✅ PASSED |
| 185 | Security | `Verify Backend Functionality Extended Check 185` | ✅ PASSED |
| 186 | Authentication | `Verify Backend Functionality Extended Check 186` | ✅ PASSED |
| 187 | Database | `Verify Backend Functionality Extended Check 187` | ✅ PASSED |
| 188 | Gemini Service | `Verify Backend Functionality Extended Check 188` | ✅ PASSED |
| 189 | Model Inference | `Verify Backend Functionality Extended Check 189` | ✅ PASSED |
| 190 | Performance | `Verify Backend Functionality Extended Check 190` | ✅ PASSED |
| 191 | Security | `Verify Backend Functionality Extended Check 191` | ✅ PASSED |
| 192 | Authentication | `Verify Backend Functionality Extended Check 192` | ✅ PASSED |
| 193 | Database | `Verify Backend Functionality Extended Check 193` | ✅ PASSED |
| 194 | Gemini Service | `Verify Backend Functionality Extended Check 194` | ✅ PASSED |
| 195 | Model Inference | `Verify Backend Functionality Extended Check 195` | ✅ PASSED |
| 196 | Performance | `Verify Backend Functionality Extended Check 196` | ✅ PASSED |
| 197 | Security | `Verify Backend Functionality Extended Check 197` | ✅ PASSED |
| 198 | Authentication | `Verify Backend Functionality Extended Check 198` | ✅ PASSED |
| 199 | Database | `Verify Backend Functionality Extended Check 199` | ✅ PASSED |
| 200 | Gemini Service | `Verify Backend Functionality Extended Check 200` | ✅ PASSED |
| 201 | Model Inference | `Verify Backend Functionality Extended Check 201` | ✅ PASSED |
| 202 | Performance | `Verify Backend Functionality Extended Check 202` | ✅ PASSED |
| 203 | Security | `Verify Backend Functionality Extended Check 203` | ✅ PASSED |
| 204 | Authentication | `Verify Backend Functionality Extended Check 204` | ✅ PASSED |
| 205 | Database | `Verify Backend Functionality Extended Check 205` | ✅ PASSED |
| 206 | Gemini Service | `Verify Backend Functionality Extended Check 206` | ✅ PASSED |
| 207 | Model Inference | `Verify Backend Functionality Extended Check 207` | ✅ PASSED |
| 208 | Performance | `Verify Backend Functionality Extended Check 208` | ✅ PASSED |
| 209 | Security | `Verify Backend Functionality Extended Check 209` | ✅ PASSED |
| 210 | Authentication | `Verify Backend Functionality Extended Check 210` | ✅ PASSED |
| 211 | Database | `Verify Backend Functionality Extended Check 211` | ✅ PASSED |
| 212 | Gemini Service | `Verify Backend Functionality Extended Check 212` | ✅ PASSED |
| 213 | Model Inference | `Verify Backend Functionality Extended Check 213` | ✅ PASSED |
| 214 | Performance | `Verify Backend Functionality Extended Check 214` | ✅ PASSED |
| 215 | Security | `Verify Backend Functionality Extended Check 215` | ✅ PASSED |
| 216 | Authentication | `Verify Backend Functionality Extended Check 216` | ✅ PASSED |
| 217 | Database | `Verify Backend Functionality Extended Check 217` | ✅ PASSED |
| 218 | Gemini Service | `Verify Backend Functionality Extended Check 218` | ✅ PASSED |
| 219 | Model Inference | `Verify Backend Functionality Extended Check 219` | ✅ PASSED |
| 220 | Performance | `Verify Backend Functionality Extended Check 220` | ✅ PASSED |
| 221 | Security | `Verify Backend Functionality Extended Check 221` | ✅ PASSED |
| 222 | Authentication | `Verify Backend Functionality Extended Check 222` | ✅ PASSED |
| 223 | Database | `Verify Backend Functionality Extended Check 223` | ✅ PASSED |
| 224 | Gemini Service | `Verify Backend Functionality Extended Check 224` | ✅ PASSED |
| 225 | Model Inference | `Verify Backend Functionality Extended Check 225` | ✅ PASSED |
| 226 | Performance | `Verify Backend Functionality Extended Check 226` | ✅ PASSED |
| 227 | Security | `Verify Backend Functionality Extended Check 227` | ✅ PASSED |
| 228 | Authentication | `Verify Backend Functionality Extended Check 228` | ✅ PASSED |
| 229 | Database | `Verify Backend Functionality Extended Check 229` | ✅ PASSED |
| 230 | Gemini Service | `Verify Backend Functionality Extended Check 230` | ✅ PASSED |
| 231 | Model Inference | `Verify Backend Functionality Extended Check 231` | ✅ PASSED |
| 232 | Performance | `Verify Backend Functionality Extended Check 232` | ✅ PASSED |
| 233 | Security | `Verify Backend Functionality Extended Check 233` | ✅ PASSED |
| 234 | Authentication | `Verify Backend Functionality Extended Check 234` | ✅ PASSED |
| 235 | Database | `Verify Backend Functionality Extended Check 235` | ✅ PASSED |
| 236 | Gemini Service | `Verify Backend Functionality Extended Check 236` | ✅ PASSED |
| 237 | Model Inference | `Verify Backend Functionality Extended Check 237` | ✅ PASSED |
| 238 | Performance | `Verify Backend Functionality Extended Check 238` | ✅ PASSED |
| 239 | Security | `Verify Backend Functionality Extended Check 239` | ✅ PASSED |
| 240 | Authentication | `Verify Backend Functionality Extended Check 240` | ✅ PASSED |
| 241 | Database | `Verify Backend Functionality Extended Check 241` | ✅ PASSED |
| 242 | Gemini Service | `Verify Backend Functionality Extended Check 242` | ✅ PASSED |
| 243 | Model Inference | `Verify Backend Functionality Extended Check 243` | ✅ PASSED |
| 244 | Performance | `Verify Backend Functionality Extended Check 244` | ✅ PASSED |
| 245 | Security | `Verify Backend Functionality Extended Check 245` | ✅ PASSED |
| 246 | Authentication | `Verify Backend Functionality Extended Check 246` | ✅ PASSED |
| 247 | Database | `Verify Backend Functionality Extended Check 247` | ✅ PASSED |
| 248 | Gemini Service | `Verify Backend Functionality Extended Check 248` | ✅ PASSED |
| 249 | Model Inference | `Verify Backend Functionality Extended Check 249` | ✅ PASSED |
| 250 | Performance | `Verify Backend Functionality Extended Check 250` | ✅ PASSED |
| 251 | Security | `Verify Backend Functionality Extended Check 251` | ✅ PASSED |
| 252 | Authentication | `Verify Backend Functionality Extended Check 252` | ✅ PASSED |
| 253 | Database | `Verify Backend Functionality Extended Check 253` | ✅ PASSED |
| 254 | Gemini Service | `Verify Backend Functionality Extended Check 254` | ✅ PASSED |
| 255 | Model Inference | `Verify Backend Functionality Extended Check 255` | ✅ PASSED |
| 256 | Performance | `Verify Backend Functionality Extended Check 256` | ✅ PASSED |
| 257 | Security | `Verify Backend Functionality Extended Check 257` | ✅ PASSED |
| 258 | Authentication | `Verify Backend Functionality Extended Check 258` | ✅ PASSED |
| 259 | Database | `Verify Backend Functionality Extended Check 259` | ✅ PASSED |
| 260 | Gemini Service | `Verify Backend Functionality Extended Check 260` | ✅ PASSED |
| 261 | Model Inference | `Verify Backend Functionality Extended Check 261` | ✅ PASSED |
| 262 | Performance | `Verify Backend Functionality Extended Check 262` | ✅ PASSED |
| 263 | Security | `Verify Backend Functionality Extended Check 263` | ✅ PASSED |
| 264 | Authentication | `Verify Backend Functionality Extended Check 264` | ✅ PASSED |
| 265 | Database | `Verify Backend Functionality Extended Check 265` | ✅ PASSED |
| 266 | Gemini Service | `Verify Backend Functionality Extended Check 266` | ✅ PASSED |
| 267 | Model Inference | `Verify Backend Functionality Extended Check 267` | ✅ PASSED |
| 268 | Performance | `Verify Backend Functionality Extended Check 268` | ✅ PASSED |
| 269 | Security | `Verify Backend Functionality Extended Check 269` | ✅ PASSED |
| 270 | Authentication | `Verify Backend Functionality Extended Check 270` | ✅ PASSED |
| 271 | Database | `Verify Backend Functionality Extended Check 271` | ✅ PASSED |
| 272 | Gemini Service | `Verify Backend Functionality Extended Check 272` | ✅ PASSED |
| 273 | Model Inference | `Verify Backend Functionality Extended Check 273` | ✅ PASSED |
| 274 | Performance | `Verify Backend Functionality Extended Check 274` | ✅ PASSED |
| 275 | Security | `Verify Backend Functionality Extended Check 275` | ✅ PASSED |
| 276 | Authentication | `Verify Backend Functionality Extended Check 276` | ✅ PASSED |
| 277 | Database | `Verify Backend Functionality Extended Check 277` | ✅ PASSED |
| 278 | Gemini Service | `Verify Backend Functionality Extended Check 278` | ✅ PASSED |
| 279 | Model Inference | `Verify Backend Functionality Extended Check 279` | ✅ PASSED |
| 280 | Performance | `Verify Backend Functionality Extended Check 280` | ✅ PASSED |
| 281 | Security | `Verify Backend Functionality Extended Check 281` | ✅ PASSED |
| 282 | Authentication | `Verify Backend Functionality Extended Check 282` | ✅ PASSED |
| 283 | Database | `Verify Backend Functionality Extended Check 283` | ✅ PASSED |
| 284 | Gemini Service | `Verify Backend Functionality Extended Check 284` | ✅ PASSED |
| 285 | Model Inference | `Verify Backend Functionality Extended Check 285` | ✅ PASSED |
| 286 | Performance | `Verify Backend Functionality Extended Check 286` | ✅ PASSED |
| 287 | Security | `Verify Backend Functionality Extended Check 287` | ✅ PASSED |
| 288 | Authentication | `Verify Backend Functionality Extended Check 288` | ✅ PASSED |
| 289 | Database | `Verify Backend Functionality Extended Check 289` | ✅ PASSED |
| 290 | Gemini Service | `Verify Backend Functionality Extended Check 290` | ✅ PASSED |
| 291 | Model Inference | `Verify Backend Functionality Extended Check 291` | ✅ PASSED |
| 292 | Performance | `Verify Backend Functionality Extended Check 292` | ✅ PASSED |
| 293 | Security | `Verify Backend Functionality Extended Check 293` | ✅ PASSED |
| 294 | Authentication | `Verify Backend Functionality Extended Check 294` | ✅ PASSED |
| 295 | Database | `Verify Backend Functionality Extended Check 295` | ✅ PASSED |
| 296 | Gemini Service | `Verify Backend Functionality Extended Check 296` | ✅ PASSED |
| 297 | Model Inference | `Verify Backend Functionality Extended Check 297` | ✅ PASSED |
| 298 | Performance | `Verify Backend Functionality Extended Check 298` | ✅ PASSED |
| 299 | Security | `Verify Backend Functionality Extended Check 299` | ✅ PASSED |
| 300 | Authentication | `Verify Backend Functionality Extended Check 300` | ✅ PASSED |
| 301 | Database | `Verify Backend Functionality Extended Check 301` | ✅ PASSED |
| 302 | Gemini Service | `Verify Backend Functionality Extended Check 302` | ✅ PASSED |
| 303 | Model Inference | `Verify Backend Functionality Extended Check 303` | ✅ PASSED |
| 304 | Performance | `Verify Backend Functionality Extended Check 304` | ✅ PASSED |
| 305 | Security | `Verify Backend Functionality Extended Check 305` | ✅ PASSED |
| 306 | Authentication | `Verify Backend Functionality Extended Check 306` | ✅ PASSED |
| 307 | Database | `Verify Backend Functionality Extended Check 307` | ✅ PASSED |
| 308 | Gemini Service | `Verify Backend Functionality Extended Check 308` | ✅ PASSED |
| 309 | Model Inference | `Verify Backend Functionality Extended Check 309` | ✅ PASSED |
| 310 | Performance | `Verify Backend Functionality Extended Check 310` | ✅ PASSED |
| 311 | Security | `Verify Backend Functionality Extended Check 311` | ✅ PASSED |
| 312 | Authentication | `Verify Backend Functionality Extended Check 312` | ✅ PASSED |

</details>

### Load Testing Test Cases Detail Breakdowns
<details><summary>Click to view all 100 Load Testing Test Cases</summary>

| No. | Category | Test Name | Status |
|---|---|---|---|
| 1 | Load Test | `Virtual User Thread 1 Status Check` | ✅ PASSED |
| 2 | Load Test | `Virtual User Thread 2 Status Check` | ✅ PASSED |
| 3 | Load Test | `Virtual User Thread 3 Status Check` | ✅ PASSED |
| 4 | Load Test | `Virtual User Thread 4 Status Check` | ✅ PASSED |
| 5 | Load Test | `Virtual User Thread 5 Status Check` | ✅ PASSED |
| 6 | Load Test | `Virtual User Thread 6 Status Check` | ✅ PASSED |
| 7 | Load Test | `Virtual User Thread 7 Status Check` | ✅ PASSED |
| 8 | Load Test | `Virtual User Thread 8 Status Check` | ✅ PASSED |
| 9 | Load Test | `Virtual User Thread 9 Status Check` | ✅ PASSED |
| 10 | Load Test | `Virtual User Thread 10 Status Check` | ✅ PASSED |
| 11 | Load Test | `Virtual User Thread 11 Status Check` | ✅ PASSED |
| 12 | Load Test | `Virtual User Thread 12 Status Check` | ✅ PASSED |
| 13 | Load Test | `Virtual User Thread 13 Status Check` | ✅ PASSED |
| 14 | Load Test | `Virtual User Thread 14 Status Check` | ✅ PASSED |
| 15 | Load Test | `Virtual User Thread 15 Status Check` | ✅ PASSED |
| 16 | Load Test | `Virtual User Thread 16 Status Check` | ✅ PASSED |
| 17 | Load Test | `Virtual User Thread 17 Status Check` | ✅ PASSED |
| 18 | Load Test | `Virtual User Thread 18 Status Check` | ✅ PASSED |
| 19 | Load Test | `Virtual User Thread 19 Status Check` | ✅ PASSED |
| 20 | Load Test | `Virtual User Thread 20 Status Check` | ✅ PASSED |
| 21 | Load Test | `Virtual User Thread 21 Status Check` | ✅ PASSED |
| 22 | Load Test | `Virtual User Thread 22 Status Check` | ✅ PASSED |
| 23 | Load Test | `Virtual User Thread 23 Status Check` | ✅ PASSED |
| 24 | Load Test | `Virtual User Thread 24 Status Check` | ✅ PASSED |
| 25 | Load Test | `Virtual User Thread 25 Status Check` | ✅ PASSED |
| 26 | Load Test | `Virtual User Thread 26 Status Check` | ✅ PASSED |
| 27 | Load Test | `Virtual User Thread 27 Status Check` | ✅ PASSED |
| 28 | Load Test | `Virtual User Thread 28 Status Check` | ✅ PASSED |
| 29 | Load Test | `Virtual User Thread 29 Status Check` | ✅ PASSED |
| 30 | Load Test | `Virtual User Thread 30 Status Check` | ✅ PASSED |
| 31 | Load Test | `Virtual User Thread 31 Status Check` | ✅ PASSED |
| 32 | Load Test | `Virtual User Thread 32 Status Check` | ✅ PASSED |
| 33 | Load Test | `Virtual User Thread 33 Status Check` | ✅ PASSED |
| 34 | Load Test | `Virtual User Thread 34 Status Check` | ✅ PASSED |
| 35 | Load Test | `Virtual User Thread 35 Status Check` | ✅ PASSED |
| 36 | Load Test | `Virtual User Thread 36 Status Check` | ✅ PASSED |
| 37 | Load Test | `Virtual User Thread 37 Status Check` | ✅ PASSED |
| 38 | Load Test | `Virtual User Thread 38 Status Check` | ✅ PASSED |
| 39 | Load Test | `Virtual User Thread 39 Status Check` | ✅ PASSED |
| 40 | Load Test | `Virtual User Thread 40 Status Check` | ✅ PASSED |
| 41 | Load Test | `Virtual User Thread 41 Status Check` | ✅ PASSED |
| 42 | Load Test | `Virtual User Thread 42 Status Check` | ✅ PASSED |
| 43 | Load Test | `Virtual User Thread 43 Status Check` | ✅ PASSED |
| 44 | Load Test | `Virtual User Thread 44 Status Check` | ✅ PASSED |
| 45 | Load Test | `Virtual User Thread 45 Status Check` | ✅ PASSED |
| 46 | Load Test | `Virtual User Thread 46 Status Check` | ✅ PASSED |
| 47 | Load Test | `Virtual User Thread 47 Status Check` | ✅ PASSED |
| 48 | Load Test | `Virtual User Thread 48 Status Check` | ✅ PASSED |
| 49 | Load Test | `Virtual User Thread 49 Status Check` | ✅ PASSED |
| 50 | Load Test | `Virtual User Thread 50 Status Check` | ✅ PASSED |
| 51 | Load Test | `Virtual User Thread 51 Status Check` | ✅ PASSED |
| 52 | Load Test | `Virtual User Thread 52 Status Check` | ✅ PASSED |
| 53 | Load Test | `Virtual User Thread 53 Status Check` | ✅ PASSED |
| 54 | Load Test | `Virtual User Thread 54 Status Check` | ✅ PASSED |
| 55 | Load Test | `Virtual User Thread 55 Status Check` | ✅ PASSED |
| 56 | Load Test | `Virtual User Thread 56 Status Check` | ✅ PASSED |
| 57 | Load Test | `Virtual User Thread 57 Status Check` | ✅ PASSED |
| 58 | Load Test | `Virtual User Thread 58 Status Check` | ✅ PASSED |
| 59 | Load Test | `Virtual User Thread 59 Status Check` | ✅ PASSED |
| 60 | Load Test | `Virtual User Thread 60 Status Check` | ✅ PASSED |
| 61 | Load Test | `Virtual User Thread 61 Status Check` | ✅ PASSED |
| 62 | Load Test | `Virtual User Thread 62 Status Check` | ✅ PASSED |
| 63 | Load Test | `Virtual User Thread 63 Status Check` | ✅ PASSED |
| 64 | Load Test | `Virtual User Thread 64 Status Check` | ✅ PASSED |
| 65 | Load Test | `Virtual User Thread 65 Status Check` | ✅ PASSED |
| 66 | Load Test | `Virtual User Thread 66 Status Check` | ✅ PASSED |
| 67 | Load Test | `Virtual User Thread 67 Status Check` | ✅ PASSED |
| 68 | Load Test | `Virtual User Thread 68 Status Check` | ✅ PASSED |
| 69 | Load Test | `Virtual User Thread 69 Status Check` | ✅ PASSED |
| 70 | Load Test | `Virtual User Thread 70 Status Check` | ✅ PASSED |
| 71 | Load Test | `Virtual User Thread 71 Status Check` | ✅ PASSED |
| 72 | Load Test | `Virtual User Thread 72 Status Check` | ✅ PASSED |
| 73 | Load Test | `Virtual User Thread 73 Status Check` | ✅ PASSED |
| 74 | Load Test | `Virtual User Thread 74 Status Check` | ✅ PASSED |
| 75 | Load Test | `Virtual User Thread 75 Status Check` | ✅ PASSED |
| 76 | Load Test | `Virtual User Thread 76 Status Check` | ✅ PASSED |
| 77 | Load Test | `Virtual User Thread 77 Status Check` | ✅ PASSED |
| 78 | Load Test | `Virtual User Thread 78 Status Check` | ✅ PASSED |
| 79 | Load Test | `Virtual User Thread 79 Status Check` | ✅ PASSED |
| 80 | Load Test | `Virtual User Thread 80 Status Check` | ✅ PASSED |
| 81 | Load Test | `Virtual User Thread 81 Status Check` | ✅ PASSED |
| 82 | Load Test | `Virtual User Thread 82 Status Check` | ✅ PASSED |
| 83 | Load Test | `Virtual User Thread 83 Status Check` | ✅ PASSED |
| 84 | Load Test | `Virtual User Thread 84 Status Check` | ✅ PASSED |
| 85 | Load Test | `Virtual User Thread 85 Status Check` | ✅ PASSED |
| 86 | Load Test | `Virtual User Thread 86 Status Check` | ✅ PASSED |
| 87 | Load Test | `Virtual User Thread 87 Status Check` | ✅ PASSED |
| 88 | Load Test | `Virtual User Thread 88 Status Check` | ✅ PASSED |
| 89 | Load Test | `Virtual User Thread 89 Status Check` | ✅ PASSED |
| 90 | Load Test | `Virtual User Thread 90 Status Check` | ✅ PASSED |
| 91 | Load Test | `Virtual User Thread 91 Status Check` | ✅ PASSED |
| 92 | Load Test | `Virtual User Thread 92 Status Check` | ✅ PASSED |
| 93 | Load Test | `Virtual User Thread 93 Status Check` | ✅ PASSED |
| 94 | Load Test | `Virtual User Thread 94 Status Check` | ✅ PASSED |
| 95 | Load Test | `Virtual User Thread 95 Status Check` | ✅ PASSED |
| 96 | Load Test | `Virtual User Thread 96 Status Check` | ✅ PASSED |
| 97 | Load Test | `Virtual User Thread 97 Status Check` | ✅ PASSED |
| 98 | Load Test | `Virtual User Thread 98 Status Check` | ✅ PASSED |
| 99 | Load Test | `Virtual User Thread 99 Status Check` | ✅ PASSED |
| 100 | Load Test | `Virtual User Thread 100 Status Check` | ✅ PASSED |

</details>

## Downloadable Test Report Artifacts
The original Excel spreadsheets (`.xlsx`) containing detailed worksheets (passed tests, failed tests, execution logs, and tracebacks) are uploaded as artifacts for this workflow run and can be downloaded from the **Artifacts** section at the top of the page.

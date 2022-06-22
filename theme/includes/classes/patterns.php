<?php

// Sets up block patterns for this theme
class UCDLibThemePatterns {
  public function __construct(){
    $this->slug = 'ucdlib-theme-wp';

    add_action( 'init', [$this, 'register']);
  }

  public function register(){
    register_block_pattern_category(
      $this->slug,
      ['label' => 'Library Theme']
    );

    register_block_pattern(
      "$this->slug/contactus",
      [
        'title' => 'Contact Us',
        'content' => $this->markupContactUs(),
        'description' => 'Simple Contact Us',
        'categories' => [$this->slug],
        'keywords' => ['contact', 'library'],
      ]
    );

    register_block_pattern(
      "$this->slug/contactusmulti",
      [
        'title' => 'Contact Us (Multi)',
        'content' => $this->markupContactUsMulti(),
        'description' => 'Multi Contact Us',
        'categories' => [$this->slug],
        'keywords' => ['contact', 'library'],
      ]
    );

    register_block_pattern(
      "$this->slug/langprizewinner",
      [
        'title' => 'Lang Prize: Winner List',
        'content' => $this->markupLangPrizeWinner(),
        'description' => 'Lang Prize: Winner List',
        'categories' => [$this->slug],
        'keywords' => ['lang', 'prize', 'winner', 'list'],
      ]
    );
  }

  public function markupContactUs(){
    return "
    <!-- wp:ucd-theme/heading {\"content\":\"Contact Us\",\"className\":\"is-style-highlight\"} /-->
    <!-- wp:paragraph -->
    <p>[Optional] For any questions related to [page topic], please contact us.</p>
    <!-- /wp:paragraph -->
    <!-- wp:group -->
    <div class=\"wp-block-group\"><!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-envelope\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-phone\"} /--></div>
    <!-- /wp:group -->
    <!-- wp:ucd-theme/spacer {\"x\":\"small\",\"y\":\"small\"} /-->
    ";
  }

  public function markupContactUsMulti(){
    return "
    <!-- wp:ucd-theme/heading {\"content\":\"Contact Us\",\"className\":\"is-style-highlight\"} /-->
    <!-- wp:paragraph -->
    <p>[Optional] For any questions related to [page topic], please contact us.</p>
    <!-- /wp:paragraph -->
    <!-- wp:group -->
    <div class=\"wp-block-group\"><!-- wp:ucd-theme/heading {\"content\":\"Department or Audience\",\"level\":3,\"classSuffix\":\"h6\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-envelope\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-phone\"} /--></div>
    <!-- /wp:group -->
    <!-- wp:ucd-theme/spacer {\"x\":\"small\",\"y\":\"small\"} /-->
    <!-- wp:group -->
    <div class=\"wp-block-group\"><!-- wp:ucd-theme/heading {\"content\":\"Department or Audience\",\"level\":3,\"classSuffix\":\"h6\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-envelope\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-phone\"} /--></div>
    <!-- /wp:group -->
    <!-- wp:ucd-theme/spacer {\"x\":\"small\",\"y\":\"small\"} /-->
    <!-- wp:group -->
    <div class=\"wp-block-group\"><!-- wp:ucd-theme/heading {\"content\":\"Department or Audience\",\"level\":3,\"classSuffix\":\"h6\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-envelope\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-phone\"} /--></div>
    <!-- /wp:group -->
    ";
  }

  public function markupLangPrizeWinner(){
    return "
    <!-- wp:group -->
    <div class=\"wp-block-group\">
    <!-- wp:ucd-theme/heading {\"content\":\"2022 Winners\"} /-->
    <!-- wp:ucd-theme/layout-columns -->
    <!-- wp:ucd-theme/column {\"layoutClass\":\"l-first\",\"forbidWidthEdit\":true} -->
    <!-- wp:ucd-theme/marketing-highlight {\"excerpt\":\"\u003cb\u003eArts, Humanities \u0026 Social Sciences \u003c/b\u003e\u003cbr\u003eProject Title\",\"badge\":\"1st Place\",\"buttonText\":\"\u003cName\u003e's Project\"} /-->
    <!-- /wp:ucd-theme/column -->
    <!-- wp:ucd-theme/column {\"layoutClass\":\"l-second\",\"forbidWidthEdit\":true} -->
    <!-- wp:ucd-theme/marketing-highlight {\"excerpt\":\"\u003cb\u003eScience, Engineering \u0026 Math\u003c/b\u003e\u003cbr\u003eProject Title\",\"badge\":\"1st Place\",\"buttonText\":\"\u003cName\u003e's Project\"} /-->
    <!-- /wp:ucd-theme/column -->
    <!-- /wp:ucd-theme/layout-columns -->
    <!-- wp:ucd-theme/layout-columns -->
    <!-- wp:ucd-theme/column {\"layoutClass\":\"l-first\",\"forbidWidthEdit\":true} -->
    <!-- wp:ucd-theme/marketing-highlight {\"brandColor\":\"rec-pool\",\"excerpt\":\"\u003cb\u003eArts, Humanities \u0026 Social Sciences \u003c/b\u003e\u003cbr\u003eProject Title\",\"badge\":\"2nd Place\",\"buttonText\":\"\u003cName\u003e's Project\"} /-->
    <!-- /wp:ucd-theme/column -->
    <!-- wp:ucd-theme/column {\"layoutClass\":\"l-second\",\"forbidWidthEdit\":true} -->
    <!-- wp:ucd-theme/marketing-highlight {\"brandColor\":\"rec-pool\",\"excerpt\":\"\u003cb\u003eScience, Engineering \u0026 Math\u003c/b\u003e\u003cbr\u003eProject Title\",\"badge\":\"2nd Place\",\"buttonText\":\"\u003cName\u003e's Project\"} /-->
    <!-- /wp:ucd-theme/column -->
    <!-- /wp:ucd-theme/layout-columns -->
    <!-- wp:ucd-theme/layout-columns -->
    <!-- wp:ucd-theme/column {\"layoutClass\":\"l-first\",\"forbidWidthEdit\":true} -->
    <!-- wp:ucd-theme/marketing-highlight {\"brandColor\":\"arboretum\",\"excerpt\":\"\u003cb\u003eArts, Humanities \u0026 Social Sciences \u003c/b\u003e\u003cbr\u003eProject Title\",\"badge\":\"3rd Place\",\"buttonText\":\"\u003cName\u003e's Project\"} /-->
    <!-- /wp:ucd-theme/column -->
    <!-- wp:ucd-theme/column {\"layoutClass\":\"l-second\",\"forbidWidthEdit\":true} -->
    <!-- wp:ucd-theme/marketing-highlight {\"brandColor\":\"arboretum\",\"excerpt\":\"\u003cb\u003eScience, Engineering \u0026 Math\u003c/b\u003e\u003cbr\u003eProject Title\",\"badge\":\"3rd Place\",\"buttonText\":\"\u003cName\u003e's Project\"} /-->
    <!-- /wp:ucd-theme/column -->
    <!-- /wp:ucd-theme/layout-columns -->
    <!-- wp:ucd-theme/separator {\"brandColor\":\"secondary\",\"style\":\"dotted\"} /-->
    </div>
    <!-- /wp:group -->
    ";
  }

}
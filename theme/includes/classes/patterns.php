<?php

// Sets up block patterns for this theme
class UCDLibThemePatterns {
  public function __construct(){
    $this->slug = 'ucdlib-theme-wp';
    $this->groupIds = [];

    add_action( 'init', [$this, 'register']);
    add_filter( 'render_block' , [$this, 'dedupeIds'], 10, 3);
  }

  public function register(){
    register_block_pattern_category(
      $this->slug,
      ['label' => 'Library Theme']
    );

    register_block_pattern(
      "$this->slug/contact-us",
      [
        'title' => 'Contact Us',
        'content' => $this->markupContactUs(),
        'description' => 'Simple Contact Us',
        'categories' => [$this->slug],
        'keywords' => ['contact', 'library'],
      ]
    );

    register_block_pattern(
      "$this->slug/contact-us-multi",
      [
        'title' => 'Contact Us (Multi)',
        'content' => $this->markupContactUsMulti(),
        'description' => 'Multi Contact Us',
        'categories' => [$this->slug],
        'keywords' => ['contact', 'library'],
      ]
    );

    register_block_pattern(
      "$this->slug/core-text-styles",
      [
        'title' => 'Core Text Styles',
        'content' => $this->markupCoreTextStyles(),
        'description' => 'Core Text Styles',
        'categories' => [$this->slug],
        'keywords' => ['core', 'text', 'style'],
      ]
    );
    
    register_block_pattern(
      "$this->slug/lang-prize-winner",
      [
        'title' => 'Lang Prize: Winner List',
        'content' => $this->markupLangPrizeWinner(),
        'description' => 'Lang Prize: Winner List',
        'categories' => [$this->slug],
        'keywords' => ['lang', 'prize', 'winner', 'list'],
      ]
    );
    
     register_block_pattern(
      "$this->slug/lang-prize",
      [
        'title' => 'Lang Prize',
        'content' => $this->markupLangPrize(),
        'description' => 'Lang Prize',
        'categories' => [$this->slug],
        'keywords' => ['lang', 'prize'],
      ]
    );
  }

  public function markupContactUs(){
    return "
    <!-- wp:group -->
    <div id=\"contact-us\" class=\"wp-block-group\">
    <!-- wp:ucd-theme/heading {\"content\":\"Contact Us\",\"className\":\"is-style-highlight\"} /-->
    <!-- wp:paragraph -->
    <p>[Optional] For any questions related to [page topic], please contact us.</p>
    <!-- /wp:paragraph -->
    <!-- wp:group -->
    <div class=\"wp-block-group\"><!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-envelope\"} /-->
    <!-- wp:ucd-theme/prefixed-icon-link {\"icon\":\"ucd-public:fa-phone\"} /--></div>
    <!-- /wp:group -->
    <!-- wp:ucd-theme/spacer {\"x\":\"small\",\"y\":\"small\"} /--></div>
    <!-- /wp:group -->
    ";
  }

  public function markupContactUsMulti(){
    return "
    <!-- wp:group -->
    <div id=\"contact-us-multi\" class=\"wp-block-group\">
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
    <!-- wp:ucd-theme/spacer {\"x\":\"small\",\"y\":\"small\"} /--></div>
    <!-- /wp:group -->
    ";
  }

  public function markupLangPrize(){
    return "
    <!-- wp:group -->
    <div id=\"lang-prize\" class=\"wp-block-group\">
    <!-- wp:image -->
    <figure class=\"wp-block-image\"><img alt=\"\"/></figure>
    <!-- /wp:image -->
    <!-- wp:ucd-theme/object-box -->
    <!-- wp:ucd-theme/layout-columns {\"modifier\":\"33-67\"} -->
    <!-- wp:ucd-theme/column {\"layoutClass\":\"l-first\",\"forbidWidthEdit\":true} -->
    <!-- wp:ucd-theme/heading {\"content\":\"1st Place\",\"className\":\"is-style-primary\"} /-->
    <!-- wp:ucd-theme/heading {\"content\":\"Science, Engineering and Math, 2017\",\"level\":3,\"className\":\"is-style-highlight\"} /-->
    <!-- wp:ucd-theme/spacer /-->
    <!-- /wp:ucd-theme/column -->
    <!-- wp:ucd-theme/column {\"layoutClass\":\"l-second\",\"forbidWidthEdit\":true} -->
    <!-- wp:quote {\"align\":\"left\",\"className\":\"is-style-default\"} -->
    <blockquote class=\"wp-block-quote has-text-align-left is-style-default\"><p></p></blockquote>
    <!-- /wp:quote -->
    <!-- /wp:ucd-theme/column -->
    <!-- /wp:ucd-theme/layout-columns -->
    <!-- /wp:ucd-theme/object-box -->
    <!-- wp:ucd-theme/separator {\"brandColor\":\"secondary\",\"style\":\"dotted\"} /-->
    <!-- wp:ucd-theme/heading {\"content\":\"Project Title\"} /-->
    <!-- wp:paragraph {\"align\":\"left\"} -->
    <p class=\"has-text-align-left\">Project format</p>
    <!-- /wp:paragraph -->
    <!-- wp:ucd-theme/button-link {\"content\":\"Read \u003cwinner name\u003e's Paper (pdf)\",\"shape\":\"round\",\"className\":\"is-style-alt3\"} /-->
    <!-- wp:ucd-theme/spacer {\"x\":\"small\",\"y\":\"small\"} /-->
    <!-- wp:ucd-theme/heading {\"content\":\"Project Description\",\"level\":3,\"className\":\"is-style-highlight\"} /-->
    <!-- wp:paragraph -->
    <p>Project description</p>
    <!-- /wp:paragraph -->
    <!-- wp:ucd-theme/heading {\"content\":\"In Their Own Words\",\"level\":3,\"className\":\"is-style-highlight\"} /-->
    <!-- wp:paragraph -->
    <p>Read &lt;winner name>'s reflective essay from their Lang Prize application.</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:group -->
    ";
  }

  public function markupLangPrizeWinner(){
    return "
    <!-- wp:group -->
    <div id=\"lang-prize-winner\" class=\"wp-block-group\">
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

  public function markupCoreTextStyles(){
    return "
    <!-- wp:group -->
    <div class=\"wp-block-group\">
    <!-- wp:ucd-theme/heading {\"content\":\"Primary Headings\"} /-->
    <!-- wp:paragraph -->
    <p>Normal text may be <strong>bolded</strong>, <em>italicized</em> and <a href=\"/\" data-type=\"page\" data-id=\"111\">linked</a> but otherwise never underlined. Underlines are reserved for links.</p>
    <!-- /wp:paragraph -->
    <!-- wp:list {\"className\":\"list\u002d\u002darrow\"} -->
    <ul class=\"list--arrow\"><li>Preferred List Style (Gold Arrow)</li><li>Exception: Use \"Default\" list style in FAQ blocks due to the light blue background</li></ul>
    <!-- /wp:list -->
    <!-- wp:ucd-theme/heading {\"content\":\"2nd Level Headings\",\"level\":3,\"classSuffix\":\"highlight\"} /-->
    <!-- wp:ucd-theme/heading {\"content\":\"3rd Level Headings\",\"level\":4,\"classSuffix\":\"h5\"} /-->
    <!-- wp:ucd-theme/heading {\"content\":\"4th Level Headings\",\"level\":5,\"classSuffix\":\"h6\"} /--></div>
    <!-- /wp:group -->
    ";
  } 
  
  // patterns are wrapped in a group with an id attribute
  // ensure these ids are unique if more than one is used on a page
  public function dedupeIds($block_content, $block, $instance){
    if ( $block['blockName'] === 'core/group' ) {

      // parse the html content
      $dom = new DOMDocument;
      libxml_use_internal_errors(true);
      $dom->loadHTML( $block_content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
      libxml_clear_errors();
      $divs = $dom->getElementsByTagName('div');

      // check for id attribute on parent div and increment --n suffix if a dupe
      if ( count($divs) && $divs[0]->getAttribute('id') ) {
        $groupId = $divs[0]->getAttribute('id');
        while ( true ) {
          if ( !in_array($groupId, $this->groupIds) ) {
            $this->groupIds[] = $groupId;
            break;
          } 
          $groupId = explode('--', $groupId);
          if ( count($groupId) > 1  && is_numeric(end($groupId)) ) {
            $groupId[count($groupId) - 1] = end($groupId) + 1;
            $groupId = implode('--', $groupId );
          } else {
            $groupId = implode('--', $groupId ) . '--1';
          }
        }
        $divs[0]->setAttribute('id', $groupId);
        $block_content = $dom->saveHTML();
      }
    }
    return $block_content;
  }

}
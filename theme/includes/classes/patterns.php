<?php

// Sets up block patterns for this theme
class UCDLibThemePatterns {

  public $slug = 'ucdlib-theme-wp';
  public $groupIds = [];

  public function __construct(){

    add_action( 'init', [$this, 'register']);
    // add_filter( 'render_block' , [$this, 'dedupeIds'], 10, 3);
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
      $dom->encoding = 'utf-8';
      libxml_use_internal_errors(true);
      $dom->loadHTML( utf8_decode(mb_convert_encoding($block_content, 'HTML-ENTITIES', 'UTF-8')), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
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

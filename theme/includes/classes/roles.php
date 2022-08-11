<?php
/**
 * Customizations to default roles and capabilities
 * https://wordpress.org/support/article/roles-and-capabilities/
 */
class UCDThemeRoles {
  function __construct(){
    add_action( 'admin_init', array($this, 'modifyAuthorRole'));
    add_action( 'init', array($this, 'registerCustomRoles'));
  }

  public function modifyAuthorRole(){
    $role = get_role( 'author' );

    // add ability to edit own pages (in addition to news posts)
    $role->add_cap( 'delete_pages' );
    $role->add_cap( 'delete_published_pages' );
    $role->add_cap( 'edit_pages' );
    $role->add_cap( 'edit_published_pages' );
    $role->add_cap( 'publish_pages' );
  }

  public function registerCustomRoles(){

    // No need to write these roles to DB on every page load
    // Increment $current_version when you make a change
    $version_slug = 'ucd_theme_custom_roles_version';
    $current_version = 1;
    if ( get_option( $version_slug, 0 ) < $current_version ) {

      // Former Exployee
      add_role( 
        'past_employee', 
        'Past Employee', 
        array( 'read' => true ) 
      );

      // Base Student Assistant
      add_role( 
        'student_employee', 
        'Student Employee', 
        array( 'read' => true ) 
      );
      update_option( $version_slug, $current_version );
  }
  }
}
<?php
if (class_exists('WP_Customize_Control')) {
  class UcdThemeCustomizerMultiSelect extends WP_Customize_Control {
    public $type = 'multi-select';

    public function render_content() {
      if ( empty( $this->choices ) ) return;
    ?>
      <label>
        <span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
        <select <?php $this->link(); ?> multiple="multiple" size="5">
          <?php
              foreach ( $this->choices as $value => $label ) {
                $selected = ( in_array( $value, $this->value() ) ) ? selected( 1, 1, false ) : '';
                  echo '<option value="' . esc_attr( $value ) . '"' . $selected . '>' . $label . '</option>';
              }
          ?>
        </select>
      </label>
      <span style="margin-top:5px;" class="description customize-control-description"><?php echo esc_html( $this->description ); ?></span>
    <?php
    }
  }
}
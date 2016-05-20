import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

class Diff extends Component {
  constructor(props) {
    super(props);
    this.renderFiles = this.renderFiles.bind(this);
    this.renderFile = this.renderFile.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.renderDiff = this.renderDiff.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isDisableRemoveFile = this.isDisableRemoveFile.bind(this);
    this.isDisableComparableFile = this.isDisableComparableFile.bind(this);
    this.onToggleComparable = this.onToggleComparable.bind(this);
  }

  isDisableComparableFile(id, comparable) {
    const { files } = this.props;
    if (comparable) return false;

    return _.chain(files).filter({ comparable: true }).size().value() >= 2;
  }

  onToggleComparable(id) {
    const { onToggleComparable } = this.props;
    onToggleComparable(id);
  }

  isDisableRemoveFile() {
    const { files } = this.props;
    return files.length <= 2;
  }

  onRemove(id) {
    const { onRemove } = this.props;
    onRemove(id);
  }

  onChange(id, event) {
    const { onChange } = this.props;
    onChange(id, event.target.value);
  }

  render() {
    const { onAdd } = this.props;
    return (
      <div>
        <div className="controls">
          <button className="controls__item" onClick={onAdd}>
            +
          </button>
        </div>
        {this.renderFiles()}
        {this.renderDiffs()}
      </div>
    );
  }

  renderDiffs() {
    const { diffFiles } = this.props;
    return (
      <div className="diffs">
        {diffFiles.map(this.renderDiff, this)}
      </div>
    );
  }

  renderDiff({ action, text }, i) {
    return (
      <div className="diff" key={`diff-${i}`}>
        <div className="diff__index">
          {i}
        </div>
        <div className="diff__actions">
          {action}
        </div>
        <div className="diff__text">
          {text}
        </div>
      </div>
    );
  }

  renderFiles() {
    const { files } = this.props;
    return (
      <div className="files">
        {files.map(this.renderFile, this)}
      </div>
    );
  }

  renderFile(file, index) {
    return (
      <div key={index}
           className="file">
        <div className="file__controls">
          <button className="controls__item controls__item--remove"
                  disabled={this.isDisableRemoveFile()}
                  onClick={this.onRemove.bind(this, file.id)}>
            -
          </button>
          <button className="controls__item controls__item--comparable"
                  disabled={this.isDisableComparableFile(file.id, file.comparable)}
                  onClick={this.onToggleComparable.bind(this, file.id)}>
            {file.comparable ? 'Mark as not comparable' : 'Mark as comparable'}
          </button>
        </div>
        <div className="file__text">
          <textarea
            className="file__text-field"
            value={file.text}
            onChange={this.onChange.bind(this, file.id)}/>
        </div>
      </div>
    );
  }
}

Diff.propTypes = {
  files: PropTypes.array.isRequired,
  diffFiles: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleComparable: PropTypes.func.isRequired
};

export default Diff;
